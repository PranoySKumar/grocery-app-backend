import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { OrderStatus } from "../Data";
import { IProduct, IUser } from "./";

type CartItem = {
  productId: ObjectId | IProduct;
  count: number;
};

export interface IOrder {
  _id: ObjectId;
  status: OrderStatus;
  transactionAmount: number;
  userId: ObjectId | IUser;
  cart: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<CartItem>(
  {
    productId: { type: SchemaTypes.ObjectId, required: true, ref: "Product" },
    count: { type: SchemaTypes.Number, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    status: { type: Number, required: true },
    transactionAmount: { type: Number, required: true },
    userId: { type: SchemaTypes.ObjectId, required: true, ref: "User" },
    cart: { type: [cartItemSchema], required: true },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
