"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../Controllers");
//user
const authRoutes = (0, express_1.Router)();
authRoutes.post("/auth/user", Controllers_1.AuthController.login);
authRoutes.get("/auth/user/verify/:phoneNumber", Controllers_1.AuthController.verifyPhoneNumber);
authRoutes.get("/auth/user/verify/:phoneNumber/otp/:code", Controllers_1.AuthController.verifyOtp);
//store
authRoutes.post("/auth/store", Controllers_1.AuthController.storeLogin);
exports.default = authRoutes;
