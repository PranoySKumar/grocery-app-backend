import { Router } from "express";
import multer from "multer";
import { UserController } from "../Controllers";

import { isAuth } from "../Middleware";

const upload = multer();

const userRoutes = Router();

//get all users
userRoutes.get("/users", isAuth, UserController.getAllUsers);

//get single user
userRoutes.get("/users/:_id", isAuth, UserController.getSingleUser);

//create a new user
userRoutes.put("/users", isAuth, upload.single("image"), UserController.createUser);

//update user
userRoutes.patch(
  "/users/:_id",
  isAuth,
  isAuth,
  upload.single("image"),
  UserController.updateUserDetails
);

//delete user
userRoutes.delete("/users/:_id", isAuth, UserController.deleteUser);

export default userRoutes;
