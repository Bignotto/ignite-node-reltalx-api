import { Request, Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
  constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importedCategories = await this.importCategoriesUseCase.execute(file);
    return response.status(200).json(importedCategories);
  }
}

export { ImportCategoriesController };
