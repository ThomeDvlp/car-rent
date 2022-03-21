import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http//middlewares/ansureAuthencated';
import { ensureAdmin } from '@shared/infra/http//middlewares/ensureAdmin';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreataCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/LisAvailableCarsController';
import { CreateCarSpecificationsController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';


const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarsController();
const createCarSpecification = new CreateCarSpecificationsController();

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

carsRoutes.get(
  '/available',
  listAvailableCarController.handle
  )

export { carsRoutes };