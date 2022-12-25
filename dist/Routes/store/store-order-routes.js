"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const storeOrderRoutes = (0, express_1.Router)();
//store
storeOrderRoutes.get("/orders", Controllers_1.OrderController.getAllOrders);
storeOrderRoutes.delete("/orders/:orderId", Controllers_1.OrderController.deleteOrder);
storeOrderRoutes.patch("/orders/:orderId", Controllers_1.OrderController.updateOrder);
storeOrderRoutes.put("/orders", Controllers_1.OrderController.createOrder);
exports.default = storeOrderRoutes;
