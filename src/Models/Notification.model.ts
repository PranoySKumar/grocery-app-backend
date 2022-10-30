import { model, Schema } from "mongoose";
import { NotificationType } from "../Data";

interface INotification {
  title: string;
  description: string;
  notificationType: NotificationType;
  createdAt?: Date;
  updatedAt?: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    notificationType: { type: String, enum: Object.values(NotificationType), required: true },
  },
  { timestamps: true }
);

export const Notification = model("Notifications", notificationSchema);
