import { Router } from "express";

import { OrderController } from "../../Controllers";

const storeOrderRoutes = Router();

//store
storeOrderRoutes.get("/orders", OrderController.getAllOrders);
storeOrderRoutes.delete(
  "/orders/:orderId",

  OrderController.deleteOrder
);
storeOrderRoutes.patch("/orders/:orderId", OrderController.updateOrder);
storeOrderRoutes.put("/orders", OrderController.createOrder);

export default storeOrderRoutes;
