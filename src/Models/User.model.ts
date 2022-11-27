import { model, ObjectId, Schema, SchemaTypes, Types } from "mongoose";
import { AddressType } from "../Data";
import { Coupon, ICoupon } from "./Coupon.model";
import { Product } from "./Product.model";

export interface IUser {
  _id: string;
  userName?: string;
  location?: { lat: number; lng: number };
  address?: String;
  pincode?: number;
  profileImageUrl?: string;
  coupons?: ObjectId[] | ICoupon[];
  favourites?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    _id: { type: SchemaTypes.String, required: true }, //phoneNumber;
    userName: SchemaTypes.String,
    address: { type: [String], default: [] },
    pincode: Number,
    location: { type: { lat: SchemaTypes.Number, lng: SchemaTypes.Number } },
    favourites: { type: [SchemaTypes.ObjectId], ref: Product.modelName },
    profileImageUrl: SchemaTypes.String,
    coupons: { type: [SchemaTypes.ObjectId], ref: Coupon.modelName, default: [] },
  },
  { timestamps: true }
);

export const User = model("users", userSchema);
