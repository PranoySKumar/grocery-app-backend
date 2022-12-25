"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth-routes"));
const category_routes_1 = __importDefault(require("./category-routes"));
const storeRouter = (0, express_1.Router)();
storeRouter.use("/store/auth", auth_routes_1.default);
storeRouter.use("/store", category_routes_1.default);
exports.default = storeRouter;
