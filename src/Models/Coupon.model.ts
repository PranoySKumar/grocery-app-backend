import { model, ObjectId, Schema, SchemaTypes } from "mongoose";

type CouponDiscount = {
  upto: number;
  percentage: number;
};

export interface ICoupon {
  _id?: ObjectId;
  title?: string;
  description?: string;
  couponDiscount?: CouponDiscount;
  createdAt?: Date;
  updatedAt?: Date;
}

const couponDiscountSchema = new Schema<CouponDiscount>(
  {
    upto: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { _id: false }
);

const couponSchema = new Schema<ICoupon>(
  {
    title: { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, required: true },
    couponDiscount: { type: couponDiscountSchema, required: true },
  },
  { timestamps: true }
);

export const Coupon = model("Coupon", couponSchema);
