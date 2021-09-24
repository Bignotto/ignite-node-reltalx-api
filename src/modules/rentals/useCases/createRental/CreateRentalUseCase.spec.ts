import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let repository: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Car Rents", () => {
  beforeEach(() => {
    repository = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(repository);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "cacacacacaca",
      user_id: "ususususususus",
      expected_return_date: new Date(),
    });
    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental with unavailable car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "cacacacacaca",
        user_id: "ususususususus",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        car_id: "cacacacacaca",
        user_id: "ererererererere",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with unavailable user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "cacacacacaca",
        user_id: "ususususususus",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        car_id: "rorororororororo",
        user_id: "ususususususus",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
