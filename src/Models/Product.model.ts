import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { QuantityType } from "../Data/product-enum";
import { Category, ICategory } from "./Category.model";

type TQuantity = {
  type: QuantityType;
  value: number;
  totalQuantity?: number;
};

export interface IProduct {
  _id?: ObjectId;
  name?: string;
  description?: string;
  price?: number;
  unitsSold?: number;
  discount?: number;
  quantity?: TQuantity;
  category?: ObjectId | ICategory;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const quantitySchema = new Schema<TQuantity>(
  {
    type: { type: String, enum: Object.values(QuantityType), required: true },
    value: Number,
    totalQuantity: { type: Number, required: true },
  },
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
    unitsSold: { type: SchemaTypes.Number, default: 0 },
    imageUrl: { type: String },
    category: { type: SchemaTypes.ObjectId, required: true, ref: "Category" },
  },
  { timestamps: true }
);

export const Product = model("Products", productSchema);
