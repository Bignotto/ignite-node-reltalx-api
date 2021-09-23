import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private cars_repository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specs_repository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.cars_repository.findById(car_id);
    if (!car) throw new AppError("Car not found!");

    // get specifications
    const specs = await this.specs_repository.findByIds(specifications_id);

    // add specifications objects array to car
    car.specifications = specs;

    // save car again
    await this.cars_repository.create(car);

    return car;
  }
}

export { CreateCarSpecificationUseCase };
