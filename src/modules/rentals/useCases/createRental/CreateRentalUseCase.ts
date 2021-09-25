import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

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

    const formatted_return_date = dayjs(expected_return_date)
      .utc()
      .local()
      .format();
    const date_now = dayjs().utc().local().format();

    const compare = dayjs(formatted_return_date).diff(date_now, "hours");
    if (compare < 24) throw new AppError("Less than 24h");

    const rental = this.rentalsRepository.create(
      car_id,
      user_id,
      expected_return_date
    );

    return rental;
  }
}

export { CreateRentalUseCase };
