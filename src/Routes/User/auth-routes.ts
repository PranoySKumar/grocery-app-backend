import { Router } from "express";
import { AuthController } from "../../Controllers/auth-controller";

const authRouter = Router();
authRouter.post("/sign-in", AuthController.login);

export default authRouter;
