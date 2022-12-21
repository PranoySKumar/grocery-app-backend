import { registerEnumType } from "type-graphql";

enum OrderStatus {
  placed = "placed",
  processing = "processing",
  outForDelivery = "out-for-delivery",
  orderDelivered = "order-delivered",
}

export enum PaymentMethod {
  googlepay = "googlepay",
  phonepe = "phonepe",
  mastercard = "mastercard",
  paytm = "paytm",
  cashondelivery = "cashondelivery",
}
registerEnumType(OrderStatus, {
  name: "OrderStatus", // this one is mandatory
  description: "different type of status for order", // this one is optional
});
registerEnumType(OrderStatus, {
  name: "PaymentMethods", // this one is mandatory
  description: "different type of payment methods for the order", // this one is optional
});

export default OrderStatus;
