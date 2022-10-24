import { model, ObjectId, Schema, SchemaTypes } from "mongoose";

export interface IUser {
  _id: number;
  userName?: string;
  location?: { type: "Point"; coordinates: number[] };
  address?: string;
  profileImageUrl?: string;
  favourites?: ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    _id: { type: SchemaTypes.Number, required: true }, //phoneNumber;
    userName: SchemaTypes.String,
    address: SchemaTypes.String,
    location: { type: { lat: SchemaTypes.Number, lng: SchemaTypes.Number } },
    favourites: { type: [SchemaTypes.ObjectId], ref: "product" },
    profileImageUrl: SchemaTypes.String,
  },
  { timestamps: true }
);

const User = model("users", userSchema);
export default User;
