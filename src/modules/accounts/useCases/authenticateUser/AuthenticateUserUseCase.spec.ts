import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/implementations/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AutenticateUserUseCase";

let authenticaseUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticaseUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })
  it('Shoul be possible to authenticate an user', async () => {
    const user: ICreateUserDTO ={
      name: 'TestUser',
      password: 'TestPassword',
      email: "tess@e.mail",
      driver_license: "test_license"
    }
    await createUserUseCase.execute (user);

    const result = await authenticaseUserUseCase.execute({
      email: user.email,
      password: user.password 
    })

    expect(result).toHaveProperty('token');
  });
  it('Shoul not be able to authenticate an nonExistent user', async () => {
    await expect( authenticaseUserUseCase.execute({
        email: 'TestPassword', 
        password: 'TestPassword'
        })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Shoul not be able to authenticate with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "TestUser",
        password: "correctPassword",
        email: "test@user.mail",
        driver_license: "testTest"
      };
      await createUserUseCase.execute(user);

      await authenticaseUserUseCase.execute({
        email:'test@user.mail',
        password:'incorrectPassword'
      })
    }).rejects.toBeInstanceOf(AppError);
  })
})
