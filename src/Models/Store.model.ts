import { model, Schema, ObjectId, SchemaTypes } from "mongoose";

type Editing = {
  isAllowed: boolean;
  productAllowed: boolean;
  profileDetailsAllowed: boolean;
};

export interface IStore {
  _id?: ObjectId | string;
  name?: string;
  email?: string;
  phoneNumber?: number;
  password?: string;
  editing?: Editing;
  tax?: number;
  deliveryTime?: string;
  deliveryPartnerFee?: number;
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
    tax: { type: SchemaTypes.Number, required: true, default: 0 },
    editing: editingSchema,
    deliveryPartnerFee: { type: SchemaTypes.Number, required: true, default: 0 },
    deliveryTime: {
      type: String,
      default: "9:00-17:00",
    },
  },
  { timestamps: true }
);

export const Store = model("Store", storeSchema);
