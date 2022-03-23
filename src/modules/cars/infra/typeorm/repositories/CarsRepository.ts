import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";



class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>
  constructor(){
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    category_id,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      description,
      category_id,
      fine_amount,
      license_plate,
      name,
      daily_rate,
      specifications,
      id
    });

    await this.repository.save(car)
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({license_plate});
    return car;
  }

  async findAvailabeCars(
    category_id?: string,
    brand?: string, 
    name?: string
    ): Promise<Car[]> {
    const availableCars = await this.repository
    .createQueryBuilder("c")
    .where("available = :available", { available: true });
    if(brand){
      availableCars.andWhere("brand = :brand", {brand});
    }
    if(category_id){
      availableCars.andWhere("category_id = :category_id", {category_id});
    }
    if(name){
      availableCars.andWhere("name = :name", {name});
    }
    const cars = await availableCars.getMany();
    return cars;    
  }

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne(id);
  }
}

export { CarsRepository }