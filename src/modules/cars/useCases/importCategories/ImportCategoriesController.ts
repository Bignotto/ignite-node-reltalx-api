import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase);
    const importedCategories = await importCategoriesUseCase.execute(file);
    return response.status(200).json(importedCategories);
  }
}

export { ImportCategoriesController };
