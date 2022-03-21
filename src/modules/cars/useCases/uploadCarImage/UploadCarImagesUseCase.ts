import { injectable, inject } from "tsyringe";

import {  ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
// import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";


interface IRequest {
  car_id: string;
  images_urls: string[];
}


@injectable()
class UploadCarImagesUseCase{
  constructor(
    @inject
    ("CarsImagesResository")
    private carsImagesRepository: ICarsImagesRepository
    ){}
  async execute ({
    car_id,
    images_urls
  }: IRequest):Promise<void>{
    images_urls.map( async(image_url)=> {
      await this.carsImagesRepository.create(
        car_id, 
        image_url
      )
    })
  };
};

export { UploadCarImagesUseCase };