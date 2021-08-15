import { Category } from '../../model/Category';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  execute({ name, description }:IRequest): Category {
    const newCategory = new Category();
    Object.assign(newCategory, { name, description });

    // use repository

    return newCategory;
  }
}

export { CreateCategoryUseCase };
