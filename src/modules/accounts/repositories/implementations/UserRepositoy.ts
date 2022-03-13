import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepoitory";


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
    avatar,
    id,
  }:ICreateUserDTO): Promise<void>{
    const user = this.repository.create({
      name,
      driver_license,
      password,
      email,
      avatar,
      id
    });

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
  
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

};

export { UsersRepository};