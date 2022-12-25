"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationReciever = exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["flashSales"] = "flash-sales";
    NotificationType["productStatusUpdate"] = "product-status-update";
    NotificationType["orderStatusUpdate"] = "order-status-update";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var NotificationReciever;
(function (NotificationReciever) {
    NotificationReciever["store"] = "store";
    NotificationReciever["user"] = "user";
})(NotificationReciever = exports.NotificationReciever || (exports.NotificationReciever = {}));
