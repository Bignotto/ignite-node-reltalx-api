import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let carsRepository: ICarsRepository;
let dateProvider: DayjsDateProvider;
let more24h: Date;
let less24h: Date;
let car: Car;

describe("Car Rents", () => {
  beforeEach(async () => {
    rentalsRepository = new RentalRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dateProvider,
      carsRepository
    );

    more24h = dateProvider.addHours(dateProvider.now(), 24);
    less24h = dateProvider.addHours(dateProvider.now(), 20);

    car = await carsRepository.create({
      brand: "test",
      category_id: "idididididi",
      daily_rate: 10,
      description: "test car",
      fine_amount: 5,
      license_plate: "xpty25",
      name: "kwid",
    });
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "ususususususus",
      expected_return_date: more24h,
    });
    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental with unavailable car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: "ususususususus",
        expected_return_date: more24h,
      });

      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: "ererererererere",
        expected_return_date: more24h,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with unavailable user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: "ususususususus",
        expected_return_date: more24h,
      });

      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: "ususususususus",
        expected_return_date: more24h,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with less than 24h", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car.id,
        user_id: "ususususususus",
        expected_return_date: less24h,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("car must be unavailable after a rent is created", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "ususususususus",
      expected_return_date: more24h,
    });

    const updatedCar = await carsRepository.findById(rental.car_id);

    expect(updatedCar.available).toBe(false);
  });
});
