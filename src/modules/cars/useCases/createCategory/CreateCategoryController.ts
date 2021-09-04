import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(CreateCategoryUseCase);

    const category = await createSpecificationUseCase.execute({
      name,
      description,
    });
    return response.status(200).json(category);
  }
}

export { CreateCategoryController };
