import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const newCategory = await this.categoryRepository.create({
      name,
      description,
    });

    return newCategory;
  }
}

export { CreateCategoryUseCase };
