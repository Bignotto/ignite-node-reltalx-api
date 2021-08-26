import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: CategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const newCategory = await this.categoryRepository.create({
      name,
      description,
    });

    return newCategory;
  }
}

export { CreateCategoryUseCase };
