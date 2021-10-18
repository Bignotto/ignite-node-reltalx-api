import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { authRoutes } from "./routes/authentication.routes";
import { carRoutes } from "./routes/cars.routes";
import { categoryRoutes } from "./routes/categories.routes";
import { passwordRoutes } from "./routes/password.routes";
import { rentalsRoutes } from "./routes/rental.routes";
import { specificationRoutes } from "./routes/specifications.routes";
import { usersRoutes } from "./routes/users.routes";

import "@shared/container";

createConnection();

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(authRoutes);
app.use(usersRoutes);
app.use(categoryRoutes);
app.use(specificationRoutes);
app.use(carRoutes);
app.use(rentalsRoutes);
app.use(passwordRoutes);

app.get("/", (request, response) =>
  response.status(200).json({
    application: "Rental X API",
    description: "Car Rental API",
    author: "Thiago Bignotto",
    contact: "bignotto@gmail.com",
  })
);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
      err,
    });
  }
);

export { app };
