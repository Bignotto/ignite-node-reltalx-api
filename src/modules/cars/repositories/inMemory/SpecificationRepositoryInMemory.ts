import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const spec = new Specification();
    Object.assign(spec, {
      name,
      description,
    });

    this.specifications.push(spec);
    return Promise.resolve(spec);
  }

  findById(id: string): Promise<Specification> {
    const found = this.specifications.find((spec) => spec.id === id);
    return Promise.resolve(found);
  }

  findByName(name: string): Promise<Specification> {
    const found = this.specifications.find((spec) => spec.name === name);
    return Promise.resolve(found);
  }

  list(): Promise<Specification[]> {
    return Promise.resolve(this.specifications);
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecs = this.specifications.filter((spec) =>
      ids.includes(spec.id)
    );

    return Promise.resolve(allSpecs);
  }
}

export { SpecificationRepositoryInMemory };
