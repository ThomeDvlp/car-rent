
import {Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRespository } from '@modules/rentals/respositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError';

interface IRequest{
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

class CreateRentalUseCase {

  constructor(
    private rentalsRepository: IRentalsRespository
  ){}
  async execute( {
    user_id,
    car_id,
    expect_return_date
  }: IRequest): Promise<void>{
    const unAvailableCar = await this.rentalsRepository.findOpenRentalByCar(car_id);
    if(unAvailableCar){
      throw new AppError("Car is not available");
    }
    const openUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
    if(openUser){
      throw new AppError(`There´s a rental in progress for this user`)
    }
  }
}

export { CreateRentalUseCase }