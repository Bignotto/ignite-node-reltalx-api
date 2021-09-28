import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { RentalCheckoutUseCase } from "./RentalCheckoutUseCase";

let rentalCheckOut: RentalCheckoutUseCase;
let rentalsRepository: RentalRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Rental Checkout Use Case", () => {
  beforeEach(async () => {
    rentalsRepository = new RentalRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    rentalCheckOut = new RentalCheckoutUseCase(
      rentalsRepository,
      carsRepository,
      dateProvider
    );
  });

  it("should be able to return a rental", async () => {
    const today = dateProvider.now();
    const car = await carsRepository.create({
      brand: "test",
      category_id: "idididididi",
      daily_rate: 10,
      description: "test car",
      fine_amount: 5,
      license_plate: "xpty25",
      name: "kwid",
    });

    const rental = await rentalsRepository.create(
      car.id,
      "ususususus",
      new Date(dateProvider.addDays(today, 2))
    );

    const result = await rentalCheckOut.execute({
      rental_id: rental.id,
      user_id: "ususususus",
    });

    expect(result.end_date).not.toBe(null);
  });
});
