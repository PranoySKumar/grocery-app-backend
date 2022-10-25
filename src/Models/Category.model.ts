import { model, ObjectId, Schema, SchemaTypes } from "mongoose";

export interface ICategory {
  _id: ObjectId;
  type: string;
  name: string;
  updatedAt: Date;
  createdAt: Date;
}

const categorySchema = new Schema(
  {
    name: { type: SchemaTypes.String, required: true },
    type: { type: SchemaTypes.String, required: true },
  },
  { timestamps: true }
);

export const Category = model("Category", categorySchema);
