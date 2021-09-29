import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
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

    const compare = this.dateProvider.hourDiff(
      new Date(),
      expected_return_date
    );
    if (compare < 24) throw new AppError("Less than 24h");

    const rental = this.rentalsRepository.create(
      car_id,
      user_id,
      expected_return_date
    );

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
