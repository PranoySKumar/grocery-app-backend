"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Services_1 = require("../Services");
class OrderController {
    // get single user orders
    static async getSingleUserOrders(req, res, next) {
        try {
            const { userId } = req.params;
            const { userId: tokenUserId } = req.body.tokenData;
            const orders = await Services_1.OrderService.getSingleUserOrders(tokenUserId !== null && tokenUserId !== void 0 ? tokenUserId : userId);
            res.status(200).json(orders);
        }
        catch (error) {
            next(error);
        }
    }
    //get all orders
    static async getAllOrders(req, res, next) {
        try {
            const filter = req.body;
            const orders = await Services_1.OrderService.getAllOrders(req.query.asce ? "asce" : "desc", filter);
            res.status(200).json(orders);
        }
        catch (error) {
            next(error);
        }
    }
    //create order
    static async createOrder(req, res, next) {
        try {
            const orderDetails = req.body;
            await Services_1.OrderService.createOrder(orderDetails);
            res.status(201).json({ orderStatus: "placed" });
        }
        catch (error) {
            next(error);
        }
    }
    //update order
    static async updateOrder(req, res, next) {
        try {
            const newOrderDetails = req.body;
            await Services_1.OrderService.updateOrder(req.params.orderId, newOrderDetails);
            res.status(201).json({ orderStatus: "updated" });
        }
        catch (error) {
            next(error);
        }
    }
    //delete order
    static async deleteOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            await Services_1.OrderService.deleteOrder(orderId);
            res.status(201).json({ orderStatus: "deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = OrderController;
