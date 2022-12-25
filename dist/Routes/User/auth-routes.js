"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", Controllers_1.AuthController.login);
authRouter.get("/verify/:phoneNumber", Controllers_1.AuthController.verifyPhoneNumber);
authRouter.get("/verify/:phoneNumber/otp/:code", Controllers_1.AuthController.verifyOtp);
exports.default = authRouter;
