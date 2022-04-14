import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest{
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ){}
  async execute( {
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental>{

    const minimumRentalHours = 24;

    const unAvailableCar = await this.rentalsRepository.findOpenRentalByCar(car_id);
    if(unAvailableCar){
      throw new AppError("Car is unavailable");
    }

    const openUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
    if(openUser){
      throw new AppError("There´s a rental in progress for this user");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if( compare < minimumRentalHours ) {
      throw new AppError("Invalid return hour")
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental 
  }
}

export { CreateRentalUseCase }