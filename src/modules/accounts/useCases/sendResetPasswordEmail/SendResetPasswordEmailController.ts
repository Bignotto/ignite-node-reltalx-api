import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendResetPasswordEmailUseCase } from "./SendResetPasswordEmailUseCase";

class SendResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const email = request.body;

    const sendResetPassword = container.resolve(SendResetPasswordEmailUseCase);

    await sendResetPassword.execute(email);

    return response.status(201);
  }
}

export { SendResetPasswordController };
