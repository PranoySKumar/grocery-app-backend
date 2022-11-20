import { Router } from "express";
import OrderController from "../../Controllers/order-controller";
import { isAuthToken } from "../../Middleware";

const userOrderRoutes = Router();

userOrderRoutes.get("/orders", OrderController.getSingleUserOrders);
userOrderRoutes.post("/orders", OrderController.createOrder);

export default userOrderRoutes;
