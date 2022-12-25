"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", Controllers_1.AuthController.storeLogin);
exports.default = authRouter;
