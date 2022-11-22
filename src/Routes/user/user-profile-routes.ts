import { Router } from "express";
import { UserController } from "../../Controllers";

const userProfileRoutes = Router();

userProfileRoutes.get("/profile", UserController.getSingleUser);
userProfileRoutes.patch("/profile", UserController.updateUserDetails);

export default userProfileRoutes;
