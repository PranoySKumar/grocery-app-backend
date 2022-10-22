import { Router } from "express";
import authRoutes from "./auth-routes";

const userRouter = Router();

userRouter.use("/auth", authRoutes);

export default userRouter;
