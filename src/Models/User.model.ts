import { model, ObjectId, Schema, SchemaTypes, Types } from "mongoose";
import { AddressType } from "../Data";
import { Coupon, ICoupon } from "./Coupon.model";
import { Product } from "./Product.model";

export interface IUser {
  _id: string;
  userName?: string;
  location?: { lat: number; lng: number };
  shippingAddresses?: IShippingAddress[];
  pincode?: number;
  profileImageUrl?: string;
  coupons?: ObjectId[] | ICoupon[];
  favourites?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IShippingAddress {
  recipientName: string;
  address: string;
  pincode: number;
  landmark?: string;
  type?: AddressType;
}

export const addressSchema = new Schema<IShippingAddress>(
  {
    address: { type: SchemaTypes.String, required: true },
    pincode: { type: SchemaTypes.Number, required: true },
    landmark: { type: SchemaTypes.String },
    recipientName: { type: SchemaTypes.String, required: true },
    type: { type: SchemaTypes.String, enum: Object.values(AddressType), required: true },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    _id: { type: SchemaTypes.String, required: true }, //phoneNumber;
    userName: SchemaTypes.String,
    shippingAddresses: { type: [addressSchema], default: [] },
    pincode: Number,
    location: { type: { lat: SchemaTypes.Number, lng: SchemaTypes.Number } },
    favourites: { type: [SchemaTypes.ObjectId], ref: Product.modelName, default: [] },
    profileImageUrl: SchemaTypes.String,
    coupons: { type: [SchemaTypes.ObjectId], ref: Coupon.modelName, default: [] },
  },
  { timestamps: true }
);

export const User = model("Users", userSchema);
