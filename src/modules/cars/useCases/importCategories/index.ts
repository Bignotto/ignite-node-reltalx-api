import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { ImportCategoriesController } from "./ImportCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export default (): ImportCategoriesController => {
  const categoriesRepository = new CategoryRepository();
  const importCategoriesUseCase = new ImportCategoriesUseCase(
    categoriesRepository
  );
  const importCategoriesController = new ImportCategoriesController(
    importCategoriesUseCase
  );
  return importCategoriesController;
};
