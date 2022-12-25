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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = exports.OrderType = void 0;
const type_graphql_1 = require("type-graphql");
const Data_1 = require("../../Data");
const orders_enum_1 = require("../../Data/orders-enum");
const coupon_type_1 = require("../Coupon/coupon.type");
const product_type_1 = require("../Product/product.type");
const user_type_1 = __importDefault(require("../User/user.type"));
let OrderType = class OrderType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OrderType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OrderType.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OrderType.prototype, "transactionAmount", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => user_type_1.default),
    __metadata("design:type", user_type_1.default)
], OrderType.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [CartItem]),
    __metadata("design:type", Array)
], OrderType.prototype, "cart", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OrderType.prototype, "tax", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OrderType.prototype, "orderNo", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => coupon_type_1.CouponType, { nullable: true }),
    __metadata("design:type", coupon_type_1.CouponType)
], OrderType.prototype, "coupon", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OrderType.prototype, "paymentMethod", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Date),
    __metadata("design:type", Date)
], OrderType.prototype, "createdAt", void 0);
OrderType = __decorate([
    (0, type_graphql_1.ObjectType)()
], OrderType);
exports.OrderType = OrderType;
let CartItem = class CartItem {
};
__decorate([
    (0, type_graphql_1.Field)((type) => product_type_1.ProductType, { nullable: false }),
    __metadata("design:type", product_type_1.ProductType)
], CartItem.prototype, "product", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CartItem.prototype, "count", void 0);
CartItem = __decorate([
    (0, type_graphql_1.ObjectType)()
], CartItem);
exports.CartItem = CartItem;
