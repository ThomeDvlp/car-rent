import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { carsRoutes } from './cars.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { rentalsRoutes } from './rentals.routes';

const router = Router();

router.use(authenticateRoutes);
router.use('/categories', categoriesRoutes);
router.use('/cars', carsRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes );
router.use('/rentals', rentalsRoutes);


export { router }