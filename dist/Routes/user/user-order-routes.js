"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../../Controllers/order-controller"));
const userOrderRoutes = (0, express_1.Router)();
userOrderRoutes.get("/orders", order_controller_1.default.getSingleUserOrders);
userOrderRoutes.post("/orders", order_controller_1.default.createOrder);
exports.default = userOrderRoutes;
