import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

// import usecase

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    try {
      const category = this.createSpecificationUseCase.execute({ name, description });
      return response.status(200).json({
        where: 'CreateSpecificationController',
        funct: 'handle',
        got: category,
      });
    } catch (error) {
      return response.status(501).json({
        error: 'something went wrong',
      });
    }
  }
}

export { CreateSpecificationController };
