import express from "express";
import swaggerUi from "swagger-ui-express";

import { authRoutes } from "./routes/authentication.routes";
import { categoryRoutes } from "./routes/categories.routes";
import { specificationRoutes } from "./routes/specifications.routes";
import { usersRoutes } from "./routes/users.routes";
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

app.use("/", (request, response) =>
  response.status(200).json({
    application: "Rental X API",
    description: "Car Rental API",
    author: "Thiago Bignotto",
    contact: "bignotto@gmail.com",
  })
);

export { app };
