import { Router } from "express";

import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendResetPasswordController } from "@modules/accounts/useCases/sendResetPasswordEmail/SendResetPasswordEmailController";

const passwordRoutes = Router();

const sendResetPasswordController = new SendResetPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/password/forgot", sendResetPasswordController.handle);
passwordRoutes.post("/password/reset", resetPasswordController.handle);

export { passwordRoutes };
