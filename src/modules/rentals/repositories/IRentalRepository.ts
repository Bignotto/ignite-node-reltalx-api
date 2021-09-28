import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalRepository {
  create(
    car_id: string,
    user_id: string,
    expected_return_date: Date,
    id?: string,
    end_date?: Date,
    total?: number
  ): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findOpenByCarId(car_id: string): Promise<Rental>;
  findOpenByUserId(user_id: string): Promise<Rental>;
}

export { IRentalRepository };
