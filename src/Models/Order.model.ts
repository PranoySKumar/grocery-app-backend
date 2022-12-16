import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { OrderStatus } from "../Data";
import { Coupon, ICoupon, IProduct, IUser } from "./";

type CartItem = {
  productId?: ObjectId | IProduct;
  count?: number;
};

export interface IOrder {
  _id: ObjectId;
  status?: OrderStatus;
  transactionAmount?: number;
  userId?: string | IUser;
  cart: CartItem[];
  tax: number;
  couponId?: ObjectId | ICoupon;
  createdAt?: Date;
  updatedAt?: Date;
}

const cartItemSchema = new Schema<CartItem>(
  {
    productId: { type: SchemaTypes.ObjectId, required: true, ref: "Products" },
    count: { type: SchemaTypes.Number, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    status: { type: String, enum: Object.values(OrderStatus), required: true },
    transactionAmount: { type: Number, required: true },
    userId: { type: String, required: true, ref: "Users" },
    cart: { type: [cartItemSchema], required: true },
    tax: { type: SchemaTypes.Number, required: true },
    couponId: { type: SchemaTypes.ObjectId, ref: "Coupon" },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);

// const data = {
//   status: "processing",
//   transactionAmount: 500,
//   userId: ObjectId("8547917302"),
//   cart: [
//     { productId: ObjectId("638598f8056d195b2bbf5bcd"), count: 4 },
//     { productId: ObjectId("638598f8056d195b2bbf5bce"), count: 4 },
//   ],
//   tax: 20,
//   couponId: null,
// };
