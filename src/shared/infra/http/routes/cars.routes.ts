import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreataCarController';
import { ensureAuthenticated } from '@shared/infra/http//middlewares/ansureAuthencated';
import { ensureAdmin } from '@shared/infra/http//middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/LisAvailableCarsController';


const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarsController();

carsRoutes.post(
  '/', 
  ensureAuthenticated, 
  ensureAdmin, 
  createCarController.handle
  );

carsRoutes.get(
  '/available',
  listAvailableCarController.handle
  )

export { carsRoutes };