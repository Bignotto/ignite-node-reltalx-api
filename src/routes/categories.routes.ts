import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import importCategoriesController from "../modules/cars/useCases/importCategories";
import listCategoriesController from "../modules/cars/useCases/listCategories";

const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();

const upload = multer({
  dest: "./tmp",
});

categoryRoutes.post("/categories", createCategoryController.handle);

categoryRoutes.get("/categories", (request, response) =>
  listCategoriesController().handle(request, response)
);

categoryRoutes.post(
  "/categories/import",
  upload.single("file"),
  (request, response) => {
    importCategoriesController().handle(request, response);
  }
);

export { categoryRoutes };
