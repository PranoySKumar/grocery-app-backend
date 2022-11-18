import { Router } from "express";
import OrderController from "../../Controllers/order-controller";
import { isAuthToken } from "../../Middleware";

const userOrderRoutes = Router();

userOrderRoutes.get("/orders", isAuthToken, OrderController.getSingleUserOrders);
userOrderRoutes.post("/orders", isAuthToken, OrderController.createOrder);

export default userOrderRoutes;
