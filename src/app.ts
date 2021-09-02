import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import { authRoutes } from "./routes/authentication.routes";
import { categoryRoutes } from "./routes/categories.routes";
import { specificationRoutes } from "./routes/specifications.routes";
import { usersRoutes } from "./routes/users.routes";
import { AppError } from "./shared/errors/AppError";
import swaggerFile from "./swagger.json";

import "./database";
import "./shared/container";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(authRoutes);
app.use(usersRoutes);
app.use(categoryRoutes);
app.use(specificationRoutes);

app.get("/", (request, response) =>
  response.status(200).json({
    application: "Rental X API",
    description: "Car Rental API",
    author: "Thiago Bignotto",
    contact: "bignotto@gmail.com",
  })
);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
