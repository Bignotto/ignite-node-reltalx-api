import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carRoutes.post(
  "/cars",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carRoutes.get("/cars", listCarsController.handle);

export { carRoutes };
