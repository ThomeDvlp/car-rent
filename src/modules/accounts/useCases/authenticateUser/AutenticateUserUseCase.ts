import { injectable, inject } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepository } from "../../repositories/implementations/UserRepositoy";



interface IRequest{
  email: string;
  password: string;
}

interface IResponse{
  user:{
    name: string;
    email: string;
  },
  token: string;
}

@injectable() 
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository  
  ){};

  async execute({email, password}){
    const user = await this.usersRepository.findByEmail(email);
    if(!user){
      throw new Error('Email or password incorret');
    }
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error('Email or password incorret');
    }

    const token = sign({}, 'c2293c45e40f83d22b2b93e6557404a9', {
      subject: user.id,
      expiresIn: '1d'
    })

    const ReturnToken:IResponse = {
      token,
      user: {
        name: user.name, 
        email: user.email
      }
    }

    return ReturnToken;
  }
}

export { AuthenticateUserUseCase }