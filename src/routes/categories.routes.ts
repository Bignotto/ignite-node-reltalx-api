import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoryRoutes = Router();

categoryRoutes.post('/categories',
  (request, response) => createCategoryController.handle(request, response));

categoryRoutes.get('/categories', (request, response) => listCategoriesController.handle(request, response));

export { categoryRoutes };
