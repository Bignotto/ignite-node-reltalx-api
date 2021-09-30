import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalsController } from "@modules/rentals/useCases/listRentals/ListRentalsController";
import { RentalCheckoutController } from "@modules/rentals/useCases/rentalCheckout/RentalCheckoutController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalCheckOutController = new RentalCheckoutController();
const listRentalsController = new ListRentalsController();

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

rentalsRoutes.get(
  "/rentals",
  ensureAuthenticated,
  listRentalsController.handle
);

export { rentalsRoutes };
