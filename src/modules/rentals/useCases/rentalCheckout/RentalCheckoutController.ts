import { Request, Response } from "express";
import { container } from "tsyringe";

import { RentalCheckoutUseCase } from "./RentalCheckoutUseCase";

class RentalCheckoutController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { rental_id } = request.params;

    const rentalCheckoutUseCase = container.resolve(RentalCheckoutUseCase);

    const chekcout_rental = await rentalCheckoutUseCase.execute({
      rental_id,
      user_id: id,
    });

    return response.status(200).json(chekcout_rental);
  }
}

export { RentalCheckoutController };
