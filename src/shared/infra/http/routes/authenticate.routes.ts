import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserContrroller = new AuthenticateUserController();

authenticateRoutes.post('/sessions', authenticateUserContrroller.handle)

export { authenticateRoutes };