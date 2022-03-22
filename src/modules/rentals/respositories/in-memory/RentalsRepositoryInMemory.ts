import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRespository } from "../IRentalsRepository";



class RentalsRepositoryInMemory implements IRentalsRespository {
  rentals: Rental[] = [];
  // constructor(
  //   private 
  // ){}
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental=> rental.car_id === car_id && rental.end_date === null);
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental=> rental.user_id === user_id && rental.end_date === null);
  }
};

export { RentalsRepositoryInMemory };