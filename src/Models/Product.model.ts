import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { QuantityType } from "../Data/product-enum";
import { Category, ICategory } from "./Category.model";

type TQuantity = {
  type: QuantityType;
  value: number;
};

export interface IProduct {
  _id?: ObjectId;
  name?: string;
  description?: string;
  price?: number;

  discount?: number;
  quantity?: TQuantity;
  totalQuantityRemaining?: number;
  categoryId?: ObjectId | ICategory;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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
    discount: { type: SchemaTypes.Number },
    totalQuantityRemaining: { type: Number, required: true },
    imageUrl: { type: String },
    categoryId: { type: SchemaTypes.ObjectId, required: true, ref: "Category" },
  },
  { timestamps: true }
);

export const Product = model("Products", productSchema);
