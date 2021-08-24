import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const newCategory = this.repository.create({ name, description });

    await this.repository.save(newCategory);

    return newCategory;
  }

  async findById(id: string): Promise<Category> {
    const found = await this.repository.findOne({ id });
    return found;
  }

  async findByName(name: string): Promise<Category> {
    const found = await this.repository.findOne({ name });
    return found;
  }

  async list(): Promise<Category[]> {
    const categoriesList = await this.repository.find();
    return categoriesList;
  }
}

export { CategoriesRepository };
