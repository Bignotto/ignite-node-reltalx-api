import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let repository: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayjsDateProvider;
let more24h: Date;
let less24h: Date;

describe("Car Rents", () => {
  beforeEach(() => {
    repository = new RentalRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(repository, dateProvider);

    more24h = dateProvider.addHours(dateProvider.now(), 24);
    less24h = dateProvider.addHours(dateProvider.now(), 20);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "cacacacacaca",
      user_id: "ususususususus",
      expected_return_date: more24h,
    });
    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental with unavailable car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "cacacacacaca",
        user_id: "ususususususus",
        expected_return_date: more24h,
      });

      await createRentalUseCase.execute({
        car_id: "cacacacacaca",
        user_id: "ererererererere",
        expected_return_date: more24h,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with unavailable user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "cacacacacaca",
        user_id: "ususususususus",
        expected_return_date: more24h,
      });

      await createRentalUseCase.execute({
        car_id: "rorororororororo",
        user_id: "ususususususus",
        expected_return_date: more24h,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with less than 24h", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "cacacacacaca",
        user_id: "ususususususus",
        expected_return_date: less24h,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
