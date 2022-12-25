"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const userAuthRoutes = (0, express_1.Router)();
userAuthRoutes.post("/auth", Controllers_1.AuthController.userLogin);
userAuthRoutes.get("/auth/:phoneNumber", Controllers_1.AuthController.userVerifyPhoneNumber);
userAuthRoutes.get("/auth/:phoneNumber/otp/:code", Controllers_1.AuthController.userVerifyOtp);
exports.default = userAuthRoutes;
