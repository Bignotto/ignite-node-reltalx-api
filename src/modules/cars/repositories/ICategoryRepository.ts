import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Category;
  findById(id: string): Category | undefined;
  findByName(name: string): Category | undefined;
  list(): Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO };
