import { Router } from "express";
import { AuthController } from "../Controllers";

//user
const authRoutes = Router();
authRoutes.post("/auth/user", AuthController.login);
authRoutes.get("/auth/user/verify/:phoneNumber", AuthController.verifyPhoneNumber);
authRoutes.get("/auth/user/verify/:phoneNumber/otp/:code", AuthController.verifyOtp);

//store
authRoutes.post("/auth/store", AuthController.storeLogin);

export default authRoutes;
