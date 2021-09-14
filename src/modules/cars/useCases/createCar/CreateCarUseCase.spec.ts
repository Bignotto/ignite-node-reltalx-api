import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let repository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Cars", () => {
  beforeEach(() => {
    repository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(repository);
  });

  it("should be able to register a new car", async () => {
    const newCar = await createCarUseCase.execute({
      name: "Kwid",
      brand: "Renault",
      category_id: "",
      daily_rate: 55,
      description: "Kwid do Big",
      fine_amount: 10,
      license_plate: "FSM5585",
    });

    console.log(newCar);
    expect(newCar).toHaveProperty("id");
  });
});
