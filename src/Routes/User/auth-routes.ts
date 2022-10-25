import { Router } from "express";
import { AuthController } from "../../Controllers";
import { AuthValidator } from "../../Validators";

const authRouter = Router();
authRouter.post("/login", AuthValidator.userLoginValidators, AuthController.login);

export default authRouter;
