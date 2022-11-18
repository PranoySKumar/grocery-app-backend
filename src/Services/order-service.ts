import { Types } from "mongoose";

import { IOrder, Order } from "../Models";

export default class OrderService {
  static async getSingleUserOrders(userId: string) {
    return await Order.find({ userId });
  }

  static async getAllOrders(arrange: "asce" | "desc", filter?: object | IOrder) {
    return await Order.find(filter ?? {}).sort({ _id: arrange === "asce" ? 1 : -1 });
  }

  static async createOrder(data: IOrder) {
    return await new Order(data).save();
  }

  static async updateOrder(orderId: string, data: IOrder) {
    return await Order.updateOne(
      { _id: new Types.ObjectId(orderId) },
      { $set: data },
      { runValidators: true, omitUndefined: true }
    );
  }
  static async deleteOrder(orderId: string) {
    return await Order.deleteOne({ _id: new Types.ObjectId(orderId) });
  }
}
