import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";

interface IRequest {
  id: string;
}

@injectable()
class ReturnRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository:IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
  ){};
  async execute({id}:IRequest):Promise<Rental>{
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimumDaily = 1;

    if(!rental){
      throw new AppError("Rental does not exists!");
    }

    const dateNow = this.dateProvider.dateNow();

    let expectedDuration = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (expectedDuration <= 0) {
      expectedDuration = minimumDaily;
    }

    const delay = this.dateProvider.compareInHours(
      dateNow,
      rental.expected_return_date
      );

    let total = 0;

    if(delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += expectedDuration * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);

    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { ReturnRentalUseCase };