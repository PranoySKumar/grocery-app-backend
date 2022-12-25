"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const storeAuthRoutes = (0, express_1.Router)();
//store
storeAuthRoutes.post("/auth", Controllers_1.AuthController.storeLogin);
exports.default = storeAuthRoutes;
