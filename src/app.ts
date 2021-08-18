import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../swagger.json";
import { categoryRoutes } from "./routes/categories.routes";
import { specificationRoutes } from "./routes/specifications.routes";

const app = express();
console.log(swaggerFile);

app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup({
    swaggerFile,
  })
);
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
