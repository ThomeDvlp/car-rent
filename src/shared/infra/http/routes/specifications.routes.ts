import { Router } from 'express';

import { ensureAuthenticade } from '@shared/infra/http/middlewares/ensureAuthenticade';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticade);
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };