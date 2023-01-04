import { Types } from "mongoose";
import { OrderStatus } from "../Data";
import { PaymentMethod } from "../Data/orders-enum";
import { AddOrderInputType, CartItemInputType } from "../Graphql/Order/order-input.type";
import { UpdateOrderInputType } from "../Graphql/Order/order.resolver";
import { Coupon, IOrder, Order, Product, Store } from "../Models";
import { IShippingAddress } from "../Models/User.model";

export default class OrderService {
  static async getSingleUserOrders(userId: string) {
    return await Order.find({ userId })
      .sort({ _id: -1 })

      .populate("cart.productId")
      .populate("couponId");
  }

  static async getAllOrders(status?: string) {
    return await Order.find(status ? { status } : {})
      .sort({ _id: -1 })
      .populate("cart.productId")
      .populate("couponId");
  }
  //gets single order.
  static async getSingleOrder(id: string) {
    return await Order.findById(id)
      .sort({ _id: -1 })
      .populate("cart.productId")
      .populate("couponId");
  }

  static async createNewOrder(data: {
    cart: CartItemInputType[];
    couponId?: string;
    userId: string;
    status: OrderStatus;
    shippingAddress: IShippingAddress;
    paymentMethod: PaymentMethod;
  }) {
    const cart = data.cart.map((item) => ({
      ...item,
      productId: new Types.ObjectId(item.productId),
    }));

    //calculates maxUnitsSold.
    cart.forEach(async (item) => {
      const product = (await Product.findById(item.productId))!;

      if (product.unitsAvailable! - item.count == 0) {
        product.unitsAvailable! -= item.count;
        product.isAvailable! = false;
      } else {
        product.unitsAvailable! -= item.count;
      }

      await product?.save();
    });
    const bill = await OrderService.calculateBill(data.cart, data.couponId);
    const store = await Store.findOne();
    const shippingCharges = store?.shippingCharges;
    const userId = data.userId;
    const couponId = data.couponId != undefined ? new Types.ObjectId(data.couponId) : null;
    const orderNo = await Order.find().count();
    await new Order({
      ...data,
      cart,
      userId,
      couponId,
      orderNo: orderNo + 1,
      shippingCharges,
      transactionAmount: bill.totalAmount,
      tax: bill.tax,
    }).save();
  }

  //creates and calculates order.
  static async calculateBill(cart: CartItemInputType[], couponId?: string) {
    let totalAmount = 0;

    await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        //calculates price
        if (product?.discount) {
          totalAmount += (product.price! - product.price! * (product.discount / 100)) * item.count;
        } else {
          totalAmount += product?.price! * item.count;
        }
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

    totalAmount += store!.shippingCharges!;

    const bill = {
      totalAmount: Math.round(totalAmount * 10) / 10,
      tax: store!.tax ?? 0,
      couponDiscount: totalCouponDiscount,
      shippingCharges: store!.shippingCharges!,
    };
    return bill;
  }

  static async checkItemsAvailability(cart: CartItemInputType[]) {
    const itemAvailabilityResult: {
      productId: string;
      isAvailable?: boolean;
      unitsAvailable?: number;
    }[] = [];
    await Promise.all(
      cart.map(async (item) => {
        const product = (await Product.findById(item.productId, {
          unitsAvailable: 1,
          isAvailable: 1,
        }))!;
        //calculates price
        if (product.unitsAvailable! - item.count < 0) {
          const unitsAvailable = product.unitsAvailable!;
          itemAvailabilityResult.push({
            productId: product._id!.toString(),
            unitsAvailable,
            isAvailable: true,
          });
        } else if (!product.isAvailable) {
          itemAvailabilityResult.push({
            productId: product._id!.toString(),
            isAvailable: false,
            unitsAvailable: 0,
          });
        }
      })
    );

    return itemAvailabilityResult;
  }

  static async updateOrder(orderId: string, data: IOrder | UpdateOrderInputType) {
    console.log(data);
    return await Order.updateOne({ _id: new Types.ObjectId(orderId) }, { $set: data });
  }

  static async deleteOrder(orderId: string) {
    return await Order.deleteOne({ _id: new Types.ObjectId(orderId) });
  }
}
