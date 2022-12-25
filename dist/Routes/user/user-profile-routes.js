"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const userProfileRoutes = (0, express_1.Router)();
userProfileRoutes.get("/profile", Controllers_1.UserController.getSingleUser);
userProfileRoutes.patch("/profile", Controllers_1.UserController.updateUserDetails);
exports.default = userProfileRoutes;
