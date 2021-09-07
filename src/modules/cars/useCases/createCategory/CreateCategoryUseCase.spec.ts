import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let repository: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    repository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(repository);
  });

  it("should be able to create a new category", async () => {
    const newCategory = await createCategoryUseCase.execute({
      name: "CAT TEST",
      description: "Category description",
    });

    expect(newCategory).toHaveProperty("id");
  });

  it("should not be able to create a new category with same name", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: "CAT TEST",
        description: "Category description",
      });

      await createCategoryUseCase.execute({
        name: "CAT TEST",
        description: "Category description",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
