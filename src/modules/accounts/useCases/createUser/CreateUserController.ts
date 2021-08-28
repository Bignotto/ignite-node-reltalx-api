import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, driver_license } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      const user = await createUserUseCase.execute({
        name,
        username,
        email,
        password,
        driver_license,
      });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(501).json({
        where: "CreateUserController",
        message: "use case execute error",
        error,
      });
    }
  }
}

export { CreateUserController };
