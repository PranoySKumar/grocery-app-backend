import { model, ObjectId, Schema, SchemaTypes, Types } from "mongoose";
import { QuantityType } from "../Data";
import { ICategory } from "./Category.model";

type TQuantity = {
  type: QuantityType;
  value: number;
};

export interface IProduct {
  _id?: ObjectId;
  name?: string;
  description?: string;
  price?: number;
  unitsSold?: number;
  discount?: number;
  quantity?: TQuantity;
  categories?: Types.ObjectId[] | ICategory[];
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
    discount: { type: SchemaTypes.Number, default: 0 },
    unitsSold: { type: SchemaTypes.Number, default: 0 },
    isAvailable: { type: SchemaTypes.Boolean, default: true },
    unitsAvailable: { type: SchemaTypes.Number, required: true },
    imageUrl: { type: String },
    categories: { type: [SchemaTypes.ObjectId], required: true, ref: "Category", default: [] },
  },
  { timestamps: true }
);

export const Product = model("Products", productSchema);
