import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { RentalCheckoutUseCase } from "./RentalCheckoutUseCase";

let rentalCheckOut: RentalCheckoutUseCase;
let rentalsRepository: RentalRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let car: Car;

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

  it("should be ok", () => {
    expect(true).toBe(true);
  });

  it("should be able to return a rental", async () => {
    const rental = await rentalsRepository.create(
      "cacacacacac",
      "ususususus",
      new Date(dateProvider.addDays(dateProvider.now(), 2))
    );

    const result = await rentalCheckOut.execute({
      rental_id: rental.id,
      user_id: "ususususus",
    });

    console.log({ result });
  });
});
