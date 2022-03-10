import { Router } from "express";

import { AuthenticateUserContrroller } from "../modules/accounts/useCases/authenticateUser/AthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserContrroller = new AuthenticateUserContrroller();

authenticateRoutes.post('/sessions', authenticateUserContrroller.handle)

export { authenticateRoutes };