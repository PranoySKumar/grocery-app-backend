import { Router } from "express";

import { OrderController } from "../../Controllers";

const dashboardOrderRoutes = Router();

//store
dashboardOrderRoutes.get("/orders", OrderController.getAllOrders);
dashboardOrderRoutes.delete(
  "/orders/:orderId",

  OrderController.deleteOrder
);
dashboardOrderRoutes.patch("/orders/:orderId", OrderController.updateOrder);
dashboardOrderRoutes.put("/orders", OrderController.createOrder);

export default dashboardOrderRoutes;
