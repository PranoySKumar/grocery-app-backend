import { Router } from "express";
import { AuthController } from "../../Controllers";

//user
const userAuthRoutes = Router();
userAuthRoutes.post("/user/user", AuthController.login);
userAuthRoutes.get("/user/auth/verify/:phoneNumber", AuthController.verifyPhoneNumber);
userAuthRoutes.get("/user/auth/verify/:phoneNumber/otp/:code", AuthController.verifyOtp);

export default userAuthRoutes;
