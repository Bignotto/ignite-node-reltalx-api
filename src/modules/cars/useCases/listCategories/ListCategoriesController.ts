import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request:Request, response:Response): Response {
    try {
      const categories = this.listCategoriesUseCase.execute();
      return response.status(200).json({
        where: 'CreateCategoryController',
        funct: 'handle',
        got: categories,
      });
    } catch (error) {
      return response.status(501).json({
        error: 'something went wrong',
      });
    }
  }
}

export { ListCategoriesController };
