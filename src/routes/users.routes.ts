import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "../modules/accounts/useCases/listUsers/ListUsersController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.post("/users", createUserController.handle);
usersRoutes.get("/users", listUsersController.handle);

export { usersRoutes };
