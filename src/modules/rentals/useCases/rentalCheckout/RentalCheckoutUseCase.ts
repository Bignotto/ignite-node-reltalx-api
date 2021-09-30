import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  rental_id: string;
  user_id: string;
}

@injectable()
class RentalCheckoutUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ rental_id, user_id }: IRequest): Promise<Rental> {
    let days = 0;
    let total = 0;

    const rental = await this.rentalsRepository.findById(rental_id);
    if (!rental) throw new AppError("Rental not found.");

    const car = await this.carsRepository.findById(rental.car_id);
    const today = this.dateProvider.now();

    // how many days to charge?
    // 1, if days diff <= 0
    // else days diff
    // return date - rental start date
    // 27 - 20 = 7

    // how many days to charge extra?
    // return date - expected return
    // 27 - 25 = 2

    // total
    // (car daily rate * days diff) + (extra days * car fine amount)

    const compare = this.dateProvider.daysDiff(today, rental.start_date);

    if (compare === 0) days = 1;
    else days = compare;

    total = days * car.daily_rate;

    const delay = this.dateProvider.daysDiff(
      rental.expected_return_date,
      today
    );
    if (delay > 0) total += delay * car.fine_amount;

    // TODO: create DTO for rental creation
    const chekcout_rental = await this.rentalsRepository.create(
      rental.car_id,
      rental.user_id,
      rental.expected_return_date,
      rental.id,
      today,
      total
    );
    await this.carsRepository.updateAvailable(rental.car_id, true);
    return chekcout_rental;
  }
}

export { RentalCheckoutUseCase };
