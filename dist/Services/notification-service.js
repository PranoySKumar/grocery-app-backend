"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_enum_1 = require("../Data/notification-enum");
const Models_1 = require("../Models");
class NotificationService {
    getAllStoreNotifications(projection) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Models_1.Notification.find({ "reciever.type": notification_enum_1.NotificationReciever.store }, projection);
        });
    }
    createStoreNotification(notification, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Models_1.Notification(Object.assign(Object.assign({}, notification), { reciever: { type: notification_enum_1.NotificationReciever.store } }));
        });
    }
    deleteNotificationsByIds(_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Models_1.Notification.deleteMany({ _id: { $in: _ids } });
        });
    }
}
exports.default = NotificationService;
