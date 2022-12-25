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
exports.GenerateBillInputType = exports.AddOrderInputType = exports.CartItemInputType = void 0;
const type_graphql_1 = require("type-graphql");
const coupon_type_1 = require("../Coupon/coupon.type");
const user_type_1 = require("../User/user.type");
let CartItemInputType = class CartItemInputType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CartItemInputType.prototype, "productId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CartItemInputType.prototype, "count", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => coupon_type_1.CouponType, { nullable: true }),
    __metadata("design:type", coupon_type_1.CouponType)
], CartItemInputType.prototype, "coupon", void 0);
CartItemInputType = __decorate([
    (0, type_graphql_1.InputType)()
], CartItemInputType);
exports.CartItemInputType = CartItemInputType;
//add new order input type.
let AddOrderInputType = class AddOrderInputType {
};
__decorate([
    (0, type_graphql_1.Field)((type) => [CartItemInputType]),
    __metadata("design:type", Array)
], AddOrderInputType.prototype, "cart", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddOrderInputType.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AddOrderInputType.prototype, "couponId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddOrderInputType.prototype, "paymentMethod", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => user_type_1.ShippingAddressType),
    __metadata("design:type", Object)
], AddOrderInputType.prototype, "shippingAddress", void 0);
AddOrderInputType = __decorate([
    (0, type_graphql_1.InputType)()
], AddOrderInputType);
exports.AddOrderInputType = AddOrderInputType;
let GenerateBillInputType = class GenerateBillInputType {
};
__decorate([
    (0, type_graphql_1.Field)((type) => [CartItemInputType]),
    __metadata("design:type", Array)
], GenerateBillInputType.prototype, "cart", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GenerateBillInputType.prototype, "couponId", void 0);
GenerateBillInputType = __decorate([
    (0, type_graphql_1.InputType)()
], GenerateBillInputType);
exports.GenerateBillInputType = GenerateBillInputType;
