import dayjs from "dayjs";

import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let repository: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let more24h: Date;
let less24h: Date;

describe("Car Rents", () => {
  beforeEach(() => {
    repository = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(repository);

    more24h = dayjs().add(1, "day").toDate();
    less24h = dayjs().add(20, "hour").toDate();
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
