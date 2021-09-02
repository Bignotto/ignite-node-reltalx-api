import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(CreateCategoryUseCase);

    const category = createSpecificationUseCase.execute({
      name,
      description,
    });
    return response.status(200).json(category);
  }
}

export { CreateCategoryController };
