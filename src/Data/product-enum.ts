// export enum DiscountType {
//   percentage = "percentage",
//   price = "price",
// }

import { registerEnumType } from "type-graphql";

enum QuantityType {
  nos = "nos",
  wgt = "wgt",
}
registerEnumType(QuantityType, {
  name: "QuantityType", // this one is mandatory
  description: "different types of quantities", // this one is optional
});
export default QuantityType;
