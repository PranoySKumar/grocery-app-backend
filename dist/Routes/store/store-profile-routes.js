"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const storeProfileRoutes = (0, express_1.Router)();
//store
storeProfileRoutes.get("/profile", Controllers_1.StoreController.getProfileDetails);
exports.default = storeProfileRoutes;
