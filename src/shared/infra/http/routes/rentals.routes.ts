import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ReturnRentalController } from '@modules/rentals/useCases/returnRental/ReturnRentalController';


const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();

rentalsRoutes.post('/', 
  ensureAuthenticated, 
  createRentalController.handle)

rentalsRoutes.post(
  '/return/:id', 
  ensureAuthenticated, 
  returnRentalController.handle)

export { rentalsRoutes };