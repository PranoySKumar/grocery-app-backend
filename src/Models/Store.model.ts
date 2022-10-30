import { model, Schema, ObjectId, SchemaTypes } from "mongoose";

type Editing = {
  isAllowed: boolean;
  productAllowed: boolean;
  profileDetailsAllowed: boolean;
};

export interface IStore {
  id: ObjectId;
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
  editing: Editing;
  createdAt?: Date;
  updatedAt?: Date;
}

const editingSchema = new Schema<Editing>(
  {
    isAllowed: { type: SchemaTypes.Boolean, default: true },
    productAllowed: { type: SchemaTypes.Boolean, default: true },
    profileDetailsAllowed: { type: SchemaTypes.Boolean, default: true },
  },
  { _id: false }
);

const storeSchema = new Schema<IStore>(
  {
    name: { type: SchemaTypes.String, required: true },
    email: { type: SchemaTypes.String, required: true },
    phoneNumber: { type: SchemaTypes.Number, required: true },
    password: { type: SchemaTypes.String, required: true },
    editing: editingSchema,
  },
  { timestamps: true }
);

export const Store = model("Store", storeSchema);
