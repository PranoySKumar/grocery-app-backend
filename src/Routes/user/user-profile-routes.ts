import { Router } from "express";
import { UserController } from "../../Controllers";
import { isAuthToken } from "../../Middleware";
import userRoutes from "./routes";

const userProfileRoutes = Router();

userProfileRoutes.get("/profile", isAuthToken, UserController.getSingleUser);
userProfileRoutes.patch("/profile", isAuthToken, UserController.updateUserDetails);

export default userProfileRoutes;
