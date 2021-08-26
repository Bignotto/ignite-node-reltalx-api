import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

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
