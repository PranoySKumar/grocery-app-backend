import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { DiscountType, QuantityType } from "../Data/product-enum";
import { ICategory } from "./Category.model";

type TDiscount = {
  type: DiscountType;
  value: number;
};

type TQuantity = {
  type: QuantityType;
  value: number;
};

export interface IProduct {
  _id?: ObjectId;
  name: string;
  description?: string;
  price: number;

  discount?: TDiscount;
  quantity: TQuantity;
  totalQuantity: number;
  categoryId: ObjectId | ICategory;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const discountSchema = new Schema<TDiscount>(
  {
    type: { type: String, enum: Object.values(DiscountType), required: true },
    value: Number,
  },
  { _id: false }
);
const quantitySchema = new Schema<TQuantity>(
  { type: { type: String, enum: Object.values(QuantityType), required: true }, value: Number },
  { _id: false }
);

//TODO: assign categoryId using Ref
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: SchemaTypes.String },
    price: { type: Number, required: true },
    quantity: { type: quantitySchema, required: true },
    discount: { type: discountSchema },
    totalQuantity: { type: Number, required: true },
    imageUrl: { type: String },
    categoryId: { type: SchemaTypes.ObjectId, required: true, ref: "Category" },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
