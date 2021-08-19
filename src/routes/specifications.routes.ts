import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationRoutes = Router();

specificationRoutes.post("/specifications", (request, response) =>
  createSpecificationController.handle(request, response)
);

export { specificationRoutes };
