"use strict";
// export enum DiscountType {
//   percentage = "percentage",
//   price = "price",
// }
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var QuantityType;
(function (QuantityType) {
    QuantityType["nos"] = "nos";
    QuantityType["wgt"] = "wgt";
})(QuantityType || (QuantityType = {}));
(0, type_graphql_1.registerEnumType)(QuantityType, {
    name: "QuantityType",
    description: "different types of quantities", // this one is optional
});
exports.default = QuantityType;
