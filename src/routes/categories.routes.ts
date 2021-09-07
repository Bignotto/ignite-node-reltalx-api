import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
  dest: "./tmp",
});

categoryRoutes.post("/categories", createCategoryController.handle);

categoryRoutes.get("/categories", listCategoriesController.handle);

categoryRoutes.post(
  "/categories/import",
  upload.single("file"),
  importCategoriesController.handle
);

export { categoryRoutes };
