import { model, ObjectId, Schema, SchemaTypes } from "mongoose";

export interface IDashboard {
  _id?: ObjectId | string;
  email?: string;
  password?: string;
}

const dashboardSchema = new Schema<IDashboard>(
  {
    email: { type: SchemaTypes.String, required: true },
    password: { type: SchemaTypes.String, required: true },
  },
  { timestamps: true }
);

export const Dashboard = model("Dashboard", dashboardSchema);
