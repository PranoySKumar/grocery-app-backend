import { Router } from "express";
import authRoutes from "./auth-routes";

const userRouter = Router();

userRouter.use("/user/auth", authRoutes);
export default userRouter;
