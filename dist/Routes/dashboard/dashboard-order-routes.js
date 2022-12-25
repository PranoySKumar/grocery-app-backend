"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const dashboardOrderRoutes = (0, express_1.Router)();
//store
dashboardOrderRoutes.get("/orders", Controllers_1.OrderController.getAllOrders);
dashboardOrderRoutes.delete("/orders/:orderId", Controllers_1.OrderController.deleteOrder);
dashboardOrderRoutes.patch("/orders/:orderId", Controllers_1.OrderController.updateOrder);
dashboardOrderRoutes.put("/orders", Controllers_1.OrderController.createOrder);
exports.default = dashboardOrderRoutes;
