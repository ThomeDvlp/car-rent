import { IRentalDTO } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";



class RentalsRepositoryInMemory implements IRentalsRepository {
  findById(id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }

  rentals: Rental[] = [];
  // constructor(
  //   private 
  // ){}
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental=> rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental=> rental.user_id === user_id && !rental.end_date);
  }

  async create({car_id, user_id, expected_return_date}: IRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      start_date: new Date(),
      expected_return_date
    })

    this.rentals.push(rental)

    return rental;
  }
};

export { RentalsRepositoryInMemory };