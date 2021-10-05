import { Router } from "express";

import { SendResetPasswordController } from "@modules/accounts/useCases/sendResetPasswordEmail/SendResetPasswordEmailController";

const passwordRoutes = Router();

const sendResetPasswordController = new SendResetPasswordController();

passwordRoutes.post("/password/reset", sendResetPasswordController.handle);

export { passwordRoutes };
