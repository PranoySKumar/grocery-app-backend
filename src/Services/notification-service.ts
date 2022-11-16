import { ObjectId } from "mongoose";
import { NotificationReciever } from "../Data/notification-enum";
import { INotification, Notification } from "../Models";

export default class NotificationService {
  async getAllStoreNotifications(projection?: object) {
    return await Notification.find({ "reciever.type": NotificationReciever.store }, projection);
  }

  async createStoreNotification(notification: INotification) {
    return await new Notification({
      ...notification,
      reciever: { type: NotificationReciever.store },
    });
  }
  async createUserNotification(userId: string, notification: INotification) {
    return await new Notification({
      ...notification,
      reciever: { type: NotificationReciever.store },
    });
  }
  async deleteNotificationsByIds(_ids: ObjectId[]) {
    return await Notification.deleteMany({ _id: { $in: _ids } });
  }
}
