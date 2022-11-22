import { Router } from "express";
import { AuthController } from "../../Controllers";

const userAuthRoutes = Router();

userAuthRoutes.post("/auth", AuthController.userLogin);
userAuthRoutes.get("/auth/:phoneNumber", AuthController.userVerifyPhoneNumber);
userAuthRoutes.get("/auth/:phoneNumber/otp/:code", AuthController.userVerifyOtp);

export default userAuthRoutes;
