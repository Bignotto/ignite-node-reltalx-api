import { Specification } from "../../model/Specification";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: SpecificationRepository) {}

  execute({ name, description }: IRequest): Specification {
    const newSpecification = this.specificationRepository.create({
      name,
      description,
    });

    return newSpecification;
  }
}

export { CreateSpecificationUseCase };
