"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const dashboardProfileRoutes = (0, express_1.Router)();
//store
dashboardProfileRoutes.get("/profile", Controllers_1.StoreController.getProfileDetails);
exports.default = dashboardProfileRoutes;
