import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  findById(id: string): Promise<Category> | undefined;
  findByName(name: string): Promise<Category> | undefined;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
