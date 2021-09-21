import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);
    return Promise.resolve(car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const found = this.cars.find((car) => car.license_plate === license_plate);
    return found;
  }

  async list(): Promise<Car[]> {
    return Promise.resolve(this.cars);
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    let availableCars = this.cars.filter((car) => car.available);

    if (!name && !brand && !category_id) return availableCars;

    availableCars = availableCars.filter((car) => {
      if (car.brand === brand) return true;
      if (car.name === name) return true;
      if (car.category_id === category_id) return true;

      return false;
    });

    return availableCars;
  }
}

export { CarsRepositoryInMemory };
