import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { Discount, Quantity } from "../Data/product-enum";
import { ICategory } from "./Category.model";

type TDiscount = {
  type: Discount;
  value: number;
};

type TQuantity = {
  type: Quantity;
  value: number;
};

export interface IProduct {
  id: ObjectId;
  name: string;
  description: string;
  price: number;

  discount: TDiscount;
  quantity: TQuantity;
  totalQuantity: number;
  categoryId: ObjectId | ICategory;
  updatedAt: Date;
  createdAt: Date;
}

const discountSchema = new Schema<TDiscount>(
  {
    type: Number,
    value: Number,
  },
  { _id: false }
);
const quantitySchema = new Schema<TQuantity>({ type: Number, value: Number }, { _id: false });

//TODO: assign categoryId using Ref
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: SchemaTypes.String },
    price: { type: Number, required: true },
    quantity: { type: quantitySchema, required: true },
    discount: { type: discountSchema },
    totalQuantity: { Number, required: true },
    categoryId: { type: SchemaTypes.ObjectId, required: true, ref: "Category" },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
