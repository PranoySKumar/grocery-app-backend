import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { Discount, Quantity } from "../Data/product-enum";

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
  price: number;

  discount: TDiscount;
  quantity: TQuantity;
  totalQuantity: number;
  categoryId: ObjectId;
  updatedAt: Date;
  createdAt: Date;
}

const discountSchema = new Schema<TDiscount>({
  type: Number,
  value: Number,
});
const quantitySchema = new Schema<TQuantity>({ type: Number, value: Number });

//TODO: assign categoryId using Ref
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: quantitySchema, required: true },
    discount: { type: discountSchema },
    totalQuantity: { Number, required: true },
    categoryId: SchemaTypes.ObjectId,
  },
  { timestamps: true }
);

const products = model("Product", productSchema);
export default products;
