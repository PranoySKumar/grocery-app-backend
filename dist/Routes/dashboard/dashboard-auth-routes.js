"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const dashboardAuthRoutes = (0, express_1.Router)();
//dashboard
//TODO: need to implement auth controller method of dashboard login.
dashboardAuthRoutes.post("/auth", Controllers_1.AuthController.dashboardLogin);
exports.default = dashboardAuthRoutes;
