import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let repository: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    repository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(repository);
  });

  it("should be able to list all cars", async () => {
    const oneCar = await repository.create({
      name: "Kwid",
      description: "Kwid do Big",
      daily_rate: 55,
      license_plate: "FSM5585",
      fine_amount: 10,
      brand: "Renault",
      category_id: "b83deb6e-e7d4-4574-99e2-fcd8b73b6c66",
    });

    const twoCar = await repository.create({
      name: "Kwid",
      description: "Kwid do Big",
      daily_rate: 55,
      license_plate: "FSM55852",
      fine_amount: 10,
      brand: "Renault",
      category_id: "b83deb6e-e7d4-4574-99e2-fcd8b73b6c66",
    });

    const cars = await listCarsUseCase.execute();

    expect(cars.length).toBeGreaterThan(0);
    expect(cars).toEqual([oneCar, twoCar]);
  });
});
