import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
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

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password 
    })

    expect(result).toHaveProperty('token');
  });
  it('Shoul not be able to authenticate an nonExistent user', async () => {
    await expect( authenticateUserUseCase.execute({
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

      await authenticateUserUseCase.execute({
        email:'test@user.mail',
        password:'incorrectPassword'
      })
    }).rejects.toBeInstanceOf(AppError);
  })
})
