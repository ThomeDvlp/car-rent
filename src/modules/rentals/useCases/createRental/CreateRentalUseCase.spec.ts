import { RentalsRepositoryInMemory } from "@modules/rentals/respositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
describe('Create Renatl', () => {

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  })

  it('Should be able to create a new rental', async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "123456",
      expect_return_date: new Date()
    });
  })
})