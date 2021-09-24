import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

// @injectable()
class CreateRentalUseCase {
  constructor(
    // @inject("RentalsRepository")
    private rentalsRepository: IRentalRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const unavailable_car = await this.rentalsRepository.findOpenByCarId(
      car_id
    );
    if (unavailable_car) throw new AppError("Car unavailable");

    const unavailable_user = await this.rentalsRepository.findOpenByUserId(
      user_id
    );
    if (unavailable_user) throw new AppError("User has open rental");

    const rental = this.rentalsRepository.create(
      car_id,
      user_id,
      expected_return_date
    );

    return rental;
  }
}

export { CreateRentalUseCase };
