"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var AddressType;
(function (AddressType) {
    AddressType["home"] = "Home";
    AddressType["work"] = "Work";
    AddressType["other"] = "Other";
})(AddressType || (AddressType = {}));
(0, type_graphql_1.registerEnumType)(AddressType, {
    name: "AddressType",
    description: "different types of quantities", // this one is optional
});
exports.default = AddressType;
