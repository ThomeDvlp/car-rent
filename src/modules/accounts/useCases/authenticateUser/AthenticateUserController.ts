import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AutenticateUserUseCase';


class AuthenticateUserContrroller {

  async handle (req: Request, res: Response): Promise<Response>{
    const { email, password } = req.body;

    const authenticaseUserUseCase = container.resolve(AuthenticateUserUseCase)

    const token = await authenticaseUserUseCase.execute({email, password});

    return res.json(token);
  }
}

export { AuthenticateUserContrroller }