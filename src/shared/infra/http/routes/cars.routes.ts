import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post("/cars", createCarController.handle);

export { carRoutes };
