import { Category } from '../../model/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoryRepository';

class CategoryRepository implements ICategoriesRepository {
  private categoriesData: Category[];

  private static INSTANCE: CategoryRepository;

  constructor() {
    this.categoriesData = [];
  }

  public static getInstance(): CategoryRepository {
    if (!CategoryRepository.INSTANCE) {
      CategoryRepository.INSTANCE = new CategoryRepository();
    }
    return CategoryRepository.INSTANCE;
  }

  create({ name, description }:ICreateCategoryDTO):Category {
    const newCategory = new Category();
    Object.assign(newCategory, { name, description });

    this.categoriesData.push(newCategory);
    return newCategory;
  }

  findById(id:string): Category | undefined {
    const found = this.categoriesData.find((cat) => cat.id === id);
    return found;
  }

  findByName(name:string): Category | undefined {
    const found = this.categoriesData.find((cat) => cat.name === name);
    return found;
  }

  list():Category[] {
    return this.categoriesData;
  }
}

export { CategoryRepository };
