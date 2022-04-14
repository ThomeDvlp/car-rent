import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ReturnRentalController } from '@modules/rentals/useCases/returnRental/ReturnRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';


const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', 
  ensureAuthenticated, 
  createRentalController.handle)

rentalsRoutes.post(
  '/return/:id', 
  ensureAuthenticated, 
  returnRentalController.handle)

  rentalsRoutes.get('/user',
    ensureAuthenticated, 
    listRentalsByUserController.handle
    )

export { rentalsRoutes };