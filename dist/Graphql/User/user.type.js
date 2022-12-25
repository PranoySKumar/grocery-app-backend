"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationType = exports.ShippingAddressType = void 0;
const type_graphql_1 = require("type-graphql");
const Data_1 = require("../../Data");
const coupon_type_1 = require("../Coupon/coupon.type");
const product_type_1 = require("../Product/product.type");
let ShippingAddressType = class ShippingAddressType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ShippingAddressType.prototype, "recipientName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ShippingAddressType.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ShippingAddressType.prototype, "pincode", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ShippingAddressType.prototype, "landmark", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Data_1.AddressType, { nullable: true }),
    __metadata("design:type", String)
], ShippingAddressType.prototype, "type", void 0);
ShippingAddressType = __decorate([
    (0, type_graphql_1.InputType)("ShippingAddressInputType"),
    (0, type_graphql_1.ObjectType)()
], ShippingAddressType);
exports.ShippingAddressType = ShippingAddressType;
let LocationType = class LocationType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], LocationType.prototype, "lat", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], LocationType.prototype, "lng", void 0);
LocationType = __decorate([
    (0, type_graphql_1.InputType)("LocationInputType"),
    (0, type_graphql_1.ObjectType)()
], LocationType);
exports.LocationType = LocationType;
let UserType = class UserType {
};
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.ID),
    __metadata("design:type", String)
], UserType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "userName", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UserType.prototype, "pincode", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserType.prototype, "profileImageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => LocationType, { nullable: true }),
    __metadata("design:type", LocationType)
], UserType.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [coupon_type_1.CouponType], { defaultValue: [] }),
    __metadata("design:type", Array)
], UserType.prototype, "coupons", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [product_type_1.ProductType], { defaultValue: [] }),
    __metadata("design:type", Array)
], UserType.prototype, "favourites", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [ShippingAddressType], { defaultValue: [] }),
    __metadata("design:type", Array)
], UserType.prototype, "shippingAddresses", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], UserType.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], UserType.prototype, "updatedAt", void 0);
UserType = __decorate([
    (0, type_graphql_1.InputType)("UserInputType"),
    (0, type_graphql_1.ObjectType)()
], UserType);
exports.default = UserType;
