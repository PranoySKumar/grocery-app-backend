import { model, ObjectId, Schema, SchemaTypes } from "mongoose";
import { NotificationType } from "../Data";
import { NotificationReciever } from "../Data/notification-enum";
import { IStore, IUser } from "./";

interface INotificationReciever {
  type: NotificationReciever | string;
  recieverId?: ObjectId;
}

export interface INotification {
  _id?: ObjectId;
  reciever: INotificationReciever;
  title: string;
  description: string;
  notificationType: NotificationType;
  createdAt?: Date;
  updatedAt?: Date;
}

const NotificationRecieverSchema = new Schema<INotificationReciever>(
  {
    type: { type: SchemaTypes.String, enum: Object.values(NotificationReciever), required: true },
    recieverId: SchemaTypes.ObjectId,
  },
  { _id: false }
);

const notificationSchema = new Schema<INotification>(
  {
    reciever: NotificationRecieverSchema,
    title: { type: String, required: true },
    description: { type: String, required: true },
    notificationType: { type: String, enum: Object.values(NotificationType), required: true },
  },
  { timestamps: true }
);

export const Notification = model("Notifications", notificationSchema);
