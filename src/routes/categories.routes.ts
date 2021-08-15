import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoryRoutes = Router();

categoryRoutes.post('/categories',
  (request, response) => createCategoryController.handle(request, response));

export { categoryRoutes };
