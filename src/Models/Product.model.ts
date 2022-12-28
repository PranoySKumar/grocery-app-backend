import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { QuantityType } from "../Data";
import { ICategory } from "./Category.model";

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
  categories?: ObjectId[] | ICategory[];
  imageUrl?: string;
  isAvailable?: boolean;
  unitsAvailable?: number;
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
    isAvailable: { type: SchemaTypes.Boolean, default: true },
    unitsAvailable: { type: SchemaTypes.Number, required: true },
    imageUrl: { type: String },
    categories: { type: [SchemaTypes.ObjectId], required: true, ref: "Category", default: [] },
  },
  { timestamps: true }
);

export const Product = model("Products", productSchema);
