import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    try {
      const category = this.createCategoryUseCase.execute({
        name,
        description,
      });
      return response.status(200).json({
        where: "CreateCategoryController",
        funct: "handle",
        got: category,
      });
    } catch (error) {
      return response.status(501).json({
        error: "something went wrong",
      });
    }
  }
}

export { CreateCategoryController };
