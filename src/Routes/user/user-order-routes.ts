import { Router } from "express";
import OrderController from "../../Controllers/order-controller";
import { isAuthToken } from "../../Middleware";

const userOrderRoutes = Router();

userOrderRoutes.get("/orders/", isAuthToken, OrderController.getAllOrders);
userOrderRoutes.get("/users/:userId/orders", isAuthToken, OrderController.getSingleUserOrders);

export default userOrderRoutes;
