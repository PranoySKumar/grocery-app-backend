import { Router } from "express";
import { AuthController } from "../../Controllers/auth-controller";
import AuthValidator from "../../Validators/auth-validator";

const authRouter = Router();
authRouter.post("/login", AuthValidator.userLoginValidator, AuthController.login);

export default authRouter;
