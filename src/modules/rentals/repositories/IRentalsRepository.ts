import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalDTO } from '../dtos/ICreateRentalsDTO';

interface IRentalsRepository {
// create({car_id, user_id, expect_return_date}: IRentalDTO): Promise<void>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: IRentalDTO): Promise<Rental>;
}

export { IRentalsRepository }