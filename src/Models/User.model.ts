import { model, ObjectId, Schema, SchemaTypes, Types } from "mongoose";
import { AddressType } from "../Data";
import { Coupon, ICoupon } from "./Coupon.model";
import { Product } from "./Product.model";

type Address = {
  name: string;
  houseNumber: number;
  blockName?: string;
  buildingName: string;
  street: string;
  landmark?: string;
  pincode: string;
  locality: string;
  addressType: AddressType;
};

export interface IUser {
  _id: string;
  userName?: string;
  location?: { lat: number; lng: number };
  address?: Address;
  pincode?: number;
  profileImageUrl?: string;
  coupons?: ObjectId[] | ICoupon[];
  favourites?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const addressSchema = new Schema<Address>(
  {
    name: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    blockName: String,
    buildingName: { type: String, required: true },
    street: { type: String, required: true },
    landmark: { type: String },
    pincode: { type: String, required: true },
    locality: { type: String, required: true },
    addressType: { type: String, enum: Object.values(AddressType), required: true },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    _id: { type: SchemaTypes.String, required: true }, //phoneNumber;
    userName: SchemaTypes.String,
    address: { type: [addressSchema], default: [] },
    pincode: Number,
    location: { type: { lat: SchemaTypes.Number, lng: SchemaTypes.Number } },
    favourites: { type: [SchemaTypes.ObjectId], ref: Product.modelName },
    profileImageUrl: SchemaTypes.String,
    coupons: { type: [SchemaTypes.ObjectId], ref: Coupon.modelName, default: [] },
  },
  { timestamps: true }
);

export const User = model("users", userSchema);
