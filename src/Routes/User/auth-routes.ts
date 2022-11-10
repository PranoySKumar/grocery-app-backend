import { Router } from "express";
import { AuthController } from "../../Controllers";

const authRouter = Router();
authRouter.post("/login", AuthController.login);
authRouter.get("/verify/:phoneNumber", AuthController.verifyPhoneNumber);
authRouter.get("/verify/:phoneNumber/otp/:code", AuthController.verifyOtp);

export default authRouter;
