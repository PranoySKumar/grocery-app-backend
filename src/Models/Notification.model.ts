import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { NotificationType } from "../Data";
import { IUser } from "./";

export interface INotification {
  id?: ObjectId;
  userId?: ObjectId | IUser;
  title: string;
  description: string;
  notificationType: NotificationType;
  createdAt?: Date;
  updatedAt?: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: SchemaTypes.ObjectId, ref: "Users" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    notificationType: { type: String, enum: Object.values(NotificationType), required: true },
  },
  { timestamps: true }
);

export const Notification = model("Notifications", notificationSchema);
