import { getRepository, Repository } from "typeorm";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarImage } from "../entities/CarImage";

class CarsImagesResository implements ICarsImagesRepository {
  private repository : Repository<CarImage>;
  constructor(){
    this.repository = getRepository(CarImage);
  }
  async create(car_id: string, image_url: string): Promise<CarImage>{
    const carImage = await this.repository.create({
      car_id,
      image_url
    })

    await this.repository.save(carImage);
    return carImage;
  }
};

export { CarsImagesResository };