"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const Data_1 = require("../Data");
const notification_enum_1 = require("../Data/notification-enum");
const NotificationRecieverSchema = new mongoose_1.Schema({
    type: { type: mongoose_1.SchemaTypes.String, enum: Object.values(notification_enum_1.NotificationReciever), required: true },
    recieverId: mongoose_1.SchemaTypes.ObjectId,
}, { _id: false });
const notificationSchema = new mongoose_1.Schema({
    reciever: NotificationRecieverSchema,
    title: { type: String, required: true },
    description: { type: String, required: true },
    notificationType: { type: String, enum: Object.values(Data_1.NotificationType), required: true },
}, { timestamps: true });
exports.Notification = (0, mongoose_1.model)("Notifications", notificationSchema);
