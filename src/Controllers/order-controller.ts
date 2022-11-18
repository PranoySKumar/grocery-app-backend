import { NextFunction, Request, Response } from "express";
import { OrderStatus } from "../Data";
import { IOrder } from "../Models";
import { OrderService } from "../Services";

export default class OrderController {
  // get single user orders
  static async getSingleUserOrders(
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      const orders = await OrderService.getSingleUserOrders(userId);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  //get all orders
  static async getAllOrders(
    req: Request<any, any, IOrder, { asce?: true }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const filter = req.body;
      const orders = await OrderService.getAllOrders(req.query.asce ? "asce" : "desc", filter);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  //create order
  static async createOrder(req: Request<any, any, IOrder>, res: Response, next: NextFunction) {
    try {
      const orderDetails = req.body;
      await OrderService.createOrder({
        ...orderDetails,
        status: OrderStatus.placed,
      });
      res.status(201).json({ orderStatus: "placed" });
    } catch (error) {
      next(error);
    }
  }

  //update order
  static async updateOrder(
    req: Request<{ orderId: string }, any, IOrder>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const newOrderDetails = req.body;
      await OrderService.updateOrder(req.params.orderId, newOrderDetails);
      res.status(201).json({ orderStatus: "updated" });
    } catch (error) {
      next(error);
    }
  }

  //delete order
  static async deleteOrder(req: Request<{ orderId: string }>, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      await OrderService.deleteOrder(orderId);

      res.status(201).json({ orderStatus: "deleted" });
    } catch (error) {
      next(error);
    }
  }
}
