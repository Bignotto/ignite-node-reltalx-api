import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalRepository } from "../IRentalRepository";

class RentalRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];

  async create(
    car_id: string,
    user_id: string,
    expected_return_date: Date
  ): Promise<Rental> {
    const newRental = new Rental();
    const start_date = new Date();
    Object.assign(newRental, {
      car_id,
      user_id,
      expected_return_date,
      start_date,
    });

    this.rentals.push(newRental);
    return Promise.resolve(newRental);
  }

  async findById(id: string): Promise<Rental> {
    return Promise.resolve(this.rentals.find((rental) => rental.id === id));
  }

  async findOpenByCarId(car_id: string): Promise<Rental> {
    return Promise.resolve(
      this.rentals.find(
        (rental) => rental.car_id === car_id && !rental.end_date
      )
    );
  }

  async findOpenByUserId(user_id: string): Promise<Rental> {
    return Promise.resolve(
      this.rentals.find(
        (rental) => rental.user_id === user_id && !rental.end_date
      )
    );
  }
}

export { RentalRepositoryInMemory };
