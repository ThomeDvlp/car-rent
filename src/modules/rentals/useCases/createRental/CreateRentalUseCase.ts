import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc)
interface IRequest{
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

class CreateRentalUseCase {

  constructor(
    private rentalsRepository: IRentalsRepository
  ){}
  async execute( {
    user_id,
    car_id,
    expect_return_date
  }: IRequest): Promise<Rental>{

    const minimumRentalHours = 24;

    const unAvailableCar = await this.rentalsRepository.findOpenRentalByCar(car_id);
    if(unAvailableCar){
      throw new AppError("Car is not available");
    }

    const openUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
    if(openUser){
      throw new AppError(`There´s a rental in progress for this user`)
    }

    const expectReturnDateFormat = dayjs(expect_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();

    const compare = dayjs(expect_return_date).diff(dateNow, 'hours');

    if( compare < minimumRentalHours ) {
      throw new AppError("Invalid return hour")
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expect_return_date
    });

    console.log("Compare Date ", compare)

    return rental 
  }
}

export { CreateRentalUseCase }