import { getRepository, Repository } from "typeorm";

import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }

  async create(
    car_id: string,
    user_id: string,
    expected_return_date: Date,
    id: string,
    end_date: Date,
    total: number
  ): Promise<Rental> {
    const newRental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });
    await this.repository.save(newRental);

    return newRental;
  }

  async findById(id: string): Promise<Rental> {
    const foundRental = await this.repository.findOne({ id });
    return foundRental;
  }

  async findOpenByCarId(car_id: string): Promise<Rental> {
    const foundRental = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return foundRental;
  }

  async findOpenByUserId(user_id: string): Promise<Rental> {
    const foundRental = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return foundRental;
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const userRentals = await this.repository.find({
      where: { user_id },
    });
    return userRentals;
  }
}

export { RentalsRepository };
