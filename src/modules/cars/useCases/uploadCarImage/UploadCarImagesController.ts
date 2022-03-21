import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';


interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    const images = req.files as IFiles[]; 
    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase); 

    const images_urls = images.map(file=> file.filename);
    await uploadCarImageUseCase.execute({
      car_id: id,
      images_urls
    })

    return res.status(201).send();
  }
};

export { UploadCarImagesController }