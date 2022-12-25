"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth-routes"));
const category_routes_1 = __importDefault(require("./category-routes"));
const product_routes_1 = __importDefault(require("./product-routes"));
const user_routes_1 = __importDefault(require("./user-routes"));
//user
const routes = (0, express_1.Router)();
routes.use(auth_routes_1.default);
routes.use(user_routes_1.default);
routes.use(category_routes_1.default);
routes.use(product_routes_1.default);
exports.default = routes;
