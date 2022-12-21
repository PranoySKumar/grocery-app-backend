import { Types } from "mongoose";
import { OrderStatus } from "../Data";
import { PaymentMethod } from "../Data/orders-enum";
import { CartItemInputType } from "../Graphql/Order/order-input.type";
import { CartItem } from "../Graphql/Order/order.type";

import { Coupon, IOrder, Order, Product, Store } from "../Models";
import { IShippingAddress } from "../Models/User.model";
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

  static async createNewOrder(data: {
    cart: CartItemInputType[];
    tax: number;
    couponId?: string;
    transactionAmount: number;
    userId: string;
    status: OrderStatus;
    shippingAddress: IShippingAddress;
    paymentMethod: PaymentMethod;
  }) {
    const cart = data.cart.map((item) => ({
      ...item,
      productId: new Types.ObjectId(item.productId),
    }));
    const userId = data.userId;
    const couponId = data.couponId != undefined ? new Types.ObjectId(data.couponId) : null;
    const orderNo = await Order.find().count();
    await new Order({ ...data, cart, userId, couponId, orderNo: orderNo + 1 }).save();
  }

  //creates and calculates order.
  static async calculateBill(cart: CartItemInputType[], couponId?: string) {
    let totalAmount = 0;

    await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (product?.discount) {
          totalAmount =
            (totalAmount + product.price! - product.price! * (product.discount / 100)) * item.count;
        } else {
          totalAmount = (totalAmount + product?.price!) * item.count;
        }
        return true;
      })
    );

    //Applying Coupon Discount.
    let totalCouponDiscount = 0;
    if (couponId) {
      const coupon = await Coupon.findById(couponId);
      totalCouponDiscount = totalAmount * (coupon?.couponDiscount?.percentage! / 100);
      if (coupon?.couponDiscount?.upto && totalCouponDiscount > coupon?.couponDiscount?.upto) {
        totalCouponDiscount = coupon.couponDiscount.upto;
      }
      totalAmount = totalAmount - totalCouponDiscount;
    }

    //calculating Tax.
    const store = await Store.findOne();

    totalAmount += store!.tax!;

    totalAmount += store!.deliveryPartnerFee!;

    const bill = {
      totalAmount: totalAmount,
      tax: store!.tax ?? 0,
      couponDiscount: totalCouponDiscount,
      deliveryPartnerFee: store!.deliveryPartnerFee!,
    };
    return bill;
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
