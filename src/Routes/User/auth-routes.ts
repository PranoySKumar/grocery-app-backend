import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../../Controllers/auth-controller";
import AuthValidator from "../../Validators/auth-validator";

const authRouter = Router();
authRouter.post("/login", AuthValidator.userLoginValidators, AuthController.login);

export default authRouter;
