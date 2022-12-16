import { registerEnumType } from "type-graphql";

enum OrderStatus {
  placed = "placed",
  processing = "processing",
  outForDelivery = "out-for-delivery",
  orderDelivered = "order-delivered",
}
registerEnumType(OrderStatus, {
  name: "OrderStatus", // this one is mandatory
  description: "different type of status for order", // this one is optional
});

export default OrderStatus;
