import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { RentalCheckoutController } from "@modules/rentals/useCases/rentalCheckout/RentalCheckoutController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalCheckOutController = new RentalCheckoutController();

rentalsRoutes.post(
  "/rentals",
  ensureAuthenticated,
  createRentalController.handle
);

rentalsRoutes.post(
  "/rentals/checkout/:rental_id",
  ensureAuthenticated,
  rentalCheckOutController.handle
);

export { rentalsRoutes };
