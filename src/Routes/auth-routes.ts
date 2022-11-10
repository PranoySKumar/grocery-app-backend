import { Router } from "express";
import { AuthController } from "../Controllers";

//user
const authRouter = Router();
authRouter.post("/auth/user", AuthController.login);
authRouter.get("/auth/user/verify/:phoneNumber", AuthController.verifyPhoneNumber);
authRouter.get("/auth/user/verify/:phoneNumber/otp/:code", AuthController.verifyOtp);

//store
authRouter.post("/auth/store", AuthController.storeLogin);

export default authRouter;
