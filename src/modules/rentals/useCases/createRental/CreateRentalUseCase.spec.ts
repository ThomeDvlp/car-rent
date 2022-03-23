import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayJsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayJsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dyaJsDateProvider: DayJsDateProvider

describe('Create Rental', () => {
  const dayAdd24hs = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dyaJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory, 
      dyaJsDateProvider
      );
  })

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "123456",
      expect_return_date: dayAdd24hs
    });

    console.log(rental)

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  });

  it("Should not be able to create a new rental if there´s one open rental to the same user", async () => {
    expect(async ()=>{
      await createRentalUseCase.execute({
        user_id: "test",
        car_id: "123456",
        expect_return_date: dayAdd24hs
      });
      await createRentalUseCase.execute({
        user_id: "test",
        car_id: "1234567",
        expect_return_date: dayAdd24hs
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("Should not be able to create a new rental if there´s one open rental to the same car", async () => {
    expect(async ()=>{
      await createRentalUseCase.execute({
        user_id: "123451",
        car_id: "test",
        expect_return_date: dayAdd24hs
      });
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expect_return_date: dayAdd24hs
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    expect(async ()=> {
      await createRentalUseCase.execute({
        user_id: "123451",
        car_id: "test",
        expect_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError)
  });
})