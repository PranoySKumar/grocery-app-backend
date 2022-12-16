import { Types } from "mongoose";

import { Coupon, IOrder, Order, Product } from "../Models";
import ProductService from "./product-service";

export default class OrderService {
  static async getSingleUserOrders(userId: string) {
    return await Order.find({ userId })
      .sort({ _id: -1 })
      .populate("userId")
      .populate("cart.productId")
      .populate("couponId");
  }

  static async getAllOrders() {
    return await Order.find({})
      .sort({ _id: -1 })
      .populate("userId")
      .populate("cart.productId")
      .populate("couponId");
  }

  //creates and calculates order
  static async createOrder(data: IOrder & { couponId?: string }) {
    const { cart, couponId } = data;
    let totalAmount = 0;
    cart.forEach(async (item) => {
      const product = await Product.findById(item.productId);
      if (product?.discount) {
        totalAmount = totalAmount + product.price! - product.price! * (product.discount / 100);
      } else {
        totalAmount = totalAmount + product?.price!;
      }
    });

    const coupon = await Coupon.findById(couponId);
    let totalCouponDiscount = totalAmount * (coupon?.couponDiscount?.percentage! / 100);
    if (coupon?.couponDiscount?.upto && totalCouponDiscount > coupon?.couponDiscount?.upto) {
      totalCouponDiscount = coupon.couponDiscount.upto;
    }

    totalAmount = totalAmount - totalCouponDiscount;

    return await new Order({
      ...data,
      transactionAmount: totalAmount,
      couponId: new Types.ObjectId(couponId),
    }).save();
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
