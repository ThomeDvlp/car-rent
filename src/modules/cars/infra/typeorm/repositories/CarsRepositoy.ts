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
    category_id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      description,
      category_id,
      fine_amount,
      license_plate,
      name,
      daily_rate
    });

    await this.repository.save(car)
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({license_plate});
    return car;
  }
}

export { CarsRepository }