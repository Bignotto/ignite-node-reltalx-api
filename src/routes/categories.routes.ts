import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoriesController } from "../modules/cars/useCases/importCategories";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoryRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoryRoutes.post("/categories", (request, response) =>
  createCategoryController.handle(request, response)
);

categoryRoutes.get("/categories", (request, response) =>
  listCategoriesController.handle(request, response)
);

categoryRoutes.post(
  "/categories/import",
  upload.single("file"),
  (request, response) => {
    importCategoriesController.handle(request, response);
  }
);

export { categoryRoutes };
