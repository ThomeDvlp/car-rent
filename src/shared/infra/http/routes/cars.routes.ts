import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http//middlewares/ensureAdmin';
import uploadConfig from '@config/upload'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreataCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/LisAvailableCarsController';
import { CreateCarSpecificationsController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';


const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarsController();
const createCarSpecification = new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/', 
  ensureAuthenticated, 
  ensureAdmin, 
  createCarController.handle
  );

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated, 
  ensureAdmin,
  createCarSpecification.handle
)

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated, 
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
)

carsRoutes.get(
  '/available',
  listAvailableCarController.handle
  )

export { carsRoutes };