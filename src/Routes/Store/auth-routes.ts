import { Router } from "express";
import { AuthController } from "../../Controllers";

const authRouter = Router();
authRouter.post("/login", AuthController.storeLogin);

export default authRouter;
