import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepositoy";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
  
  const authHeader = req.headers.authorization;
  if(!authHeader){
    throw new AppError('Missing token', 401)
  }
  const[, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(token, 'c2293c45e40f83d22b2b93e6557404a9') as IPayload;
    
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id)

    if(!user){
      throw new AppError('User does not exists', 401);
    }
    req.user = {
      id: user_id
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}