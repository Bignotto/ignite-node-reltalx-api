import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    try {
      const category = createSpecificationUseCase.execute({
        name,
        description,
      });
      return response.status(200).json({
        where: "CreateSpecificationController",
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

export { CreateSpecificationController };
