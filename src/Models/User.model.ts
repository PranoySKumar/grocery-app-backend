import { model, ObjectId, Schema, SchemaTypes } from "mongoose";

interface IUser {
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
    location: { type: { type: "Point", coordinates: [SchemaTypes.Number] } }, // [lng,lat] +> !!!Longitude is entered first.
    favourites: { type: [SchemaTypes.ObjectId], ref: "products" },
    profileImageUrl: SchemaTypes.String,
  },
  { timestamps: true }
);

const User = model("users", userSchema);
export default User;
