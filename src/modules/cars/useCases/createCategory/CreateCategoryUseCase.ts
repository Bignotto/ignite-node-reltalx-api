import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const found = await this.categoryRepository.findByName(name);
    if (found) throw new AppError("Category already exists.", 400);

    const newCategory = await this.categoryRepository.create({
      name,
      description,
    });

    return newCategory;
  }
}

export { CreateCategoryUseCase };
