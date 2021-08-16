import { Category } from '../../model/Category';
import { CategoryRepository } from '../../repositories/implementations/CategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute({ name, description }:IRequest): Category {
    const newCategory = this.categoryRepository.create({ name, description });

    return newCategory;
  }
}

export { CreateCategoryUseCase };
