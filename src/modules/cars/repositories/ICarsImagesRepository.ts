import { CarImage } from "../infra/typeorm/entities/CarImage";



interface ICarsImagesRepository {
  create(car_id: string, image_url:string):Promise<CarImage>;
};

export { ICarsImagesRepository };