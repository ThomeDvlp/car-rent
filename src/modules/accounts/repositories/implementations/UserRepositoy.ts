import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepoitory";


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
    constructor(){
      this.repository = getRepository(User);
    }
  async create({
    name, 
    email,
    password,
    driver_license,
    username
  }:ICreateUserDTO): Promise<void>{
    const user = this.repository.create({
      name,
      driver_license,
      password,
      email,
      username
    });

    await this.repository.save(user)
  }
  
};

export { UsersRepository};