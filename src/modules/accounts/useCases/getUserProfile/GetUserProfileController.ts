import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserProfileUseCase } from "./GetUserProfileUseCase";

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const profileUserUseCase = container.resolve(GetUserProfileUseCase);

    const user = await profileUserUseCase.execute(id);
    return response.json(user);
  }
}

export { GetUserProfileController };
