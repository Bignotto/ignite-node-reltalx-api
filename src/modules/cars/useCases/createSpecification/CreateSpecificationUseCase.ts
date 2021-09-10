import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: SpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const newSpecification = await this.specificationRepository.create({
      name,
      description,
    });

    return newSpecification;
  }
}

export { CreateSpecificationUseCase };
