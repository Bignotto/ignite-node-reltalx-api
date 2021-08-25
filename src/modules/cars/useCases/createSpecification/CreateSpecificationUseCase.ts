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

  execute({ name, description }: IRequest): Specification {
    const newSpecification = this.specificationRepository.create({
      name,
      description,
    });

    return newSpecification;
  }
}

export { CreateSpecificationUseCase };
