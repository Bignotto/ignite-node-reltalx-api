import { getRepository, Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const newSpecification = this.repository.create({ name, description });

    await this.repository.save(newSpecification);

    return newSpecification;
  }

  async findById(id: string): Promise<Specification> {
    const found = await this.repository.findOne({ id });
    return found;
  }

  async findByName(name: string): Promise<Specification> {
    const found = await this.repository.findOne({ name });
    return found;
  }

  async list(): Promise<Specification[]> {
    const categoriesList = await this.repository.find();
    return categoriesList;
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
}

export { SpecificationRepository };
