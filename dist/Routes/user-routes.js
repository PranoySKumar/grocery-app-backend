"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const Controllers_1 = require("../Controllers");
const Middleware_1 = require("../Middleware");
const upload = (0, multer_1.default)();
const userRoutes = (0, express_1.Router)();
//get all users
userRoutes.get("/users", Middleware_1.isAuth, Controllers_1.UserController.getAllUsers);
//get single user
userRoutes.get("/users/:_id", Middleware_1.isAuth, Controllers_1.UserController.getSingleUser);
//create a new user
userRoutes.put("/users", Middleware_1.isAuth, upload.single("image"), Controllers_1.UserController.createUser);
//update user
userRoutes.patch("/users/:_id", Middleware_1.isAuth, Middleware_1.isAuth, upload.single("image"), Controllers_1.UserController.updateUserDetails);
//delete user
userRoutes.delete("/users/:_id", Middleware_1.isAuth, Controllers_1.UserController.deleteUser);
exports.default = userRoutes;
