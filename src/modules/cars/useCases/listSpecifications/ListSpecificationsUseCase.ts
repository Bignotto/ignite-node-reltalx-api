import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private repository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specs = this.repository.list();
    return specs;
  }
}

export { ListSpecificationsUseCase };
