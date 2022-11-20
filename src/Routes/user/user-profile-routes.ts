import { Router } from "express";
import { UserController } from "../../Controllers";
import { isAuthToken } from "../../Middleware";
import userRoutes from "./routes";

const userProfileRoutes = Router();

userProfileRoutes.get("/profile", UserController.getSingleUser);
userProfileRoutes.patch("/profile", UserController.updateUserDetails);

export default userProfileRoutes;
