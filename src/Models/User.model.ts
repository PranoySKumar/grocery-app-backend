import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { AddressType } from "../Data";

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
  _id: number;
  userName?: string;
  location?: { type: "Point"; coordinates: number[] };
  address?: Address;
  pincode?: string;
  profileImageUrl?: string;
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
    _id: { type: SchemaTypes.Number, required: true }, //phoneNumber;
    userName: SchemaTypes.String,
    address: { type: [addressSchema], default: [] },
    location: { type: { lat: SchemaTypes.Number, lng: SchemaTypes.Number } },
    favourites: { type: [SchemaTypes.ObjectId], ref: "product" },
    profileImageUrl: SchemaTypes.String,
  },
  { timestamps: true }
);

export const User = model("users", userSchema);
