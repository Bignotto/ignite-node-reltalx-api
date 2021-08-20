import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): Category {
    const newCategory = this.categoryRepository.create({ name, description });

    return newCategory;
  }
}

export { CreateCategoryUseCase };
