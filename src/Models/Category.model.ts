import { model, ObjectId, Schema, SchemaTypes } from "mongoose";

export interface ICategory {
  _id?: ObjectId;
  type?: string;
  name?: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: SchemaTypes.String, required: true },
    type: { type: SchemaTypes.String, required: true },
    imageUrl: { type: SchemaTypes.String, required: true },
  },
  { timestamps: true }
);

export const Category = model("Category", categorySchema);
