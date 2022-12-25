"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = void 0;
const type_graphql_1 = require("type-graphql");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["placed"] = "placed";
    OrderStatus["processing"] = "processing";
    OrderStatus["outForDelivery"] = "out-for-delivery";
    OrderStatus["orderDelivered"] = "order-delivered";
})(OrderStatus || (OrderStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["googlepay"] = "googlepay";
    PaymentMethod["phonepe"] = "phonepe";
    PaymentMethod["mastercard"] = "mastercard";
    PaymentMethod["paytm"] = "paytm";
    PaymentMethod["cashondelivery"] = "cashondelivery";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
(0, type_graphql_1.registerEnumType)(OrderStatus, {
    name: "OrderStatus",
    description: "different type of status for order", // this one is optional
});
(0, type_graphql_1.registerEnumType)(OrderStatus, {
    name: "PaymentMethods",
    description: "different type of payment methods for the order", // this one is optional
});
exports.default = OrderStatus;
