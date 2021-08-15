import express from "express";

const app = express();

app.use(express.json());

app.use("/", (request,response) => response.status(200).json({
    application: "Rental X API",
    description: "Car Rental API",
    author: "Thiago Bignotto",
    contact: "bignotto@gmail.com"
}));

export { app };