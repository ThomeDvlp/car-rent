import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'

// interface IRentalDTO {
//   car_id: string;
//   user_id: string;
//   expect_return_date: Date;  
// }

interface IRentalsRespository {
// create({car_id, user_id, expect_return_date}: IRentalDTO): Promise<void>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRespository }