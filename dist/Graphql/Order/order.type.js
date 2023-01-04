"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = exports.OrderType = void 0;
const type_graphql_1 = require("type-graphql");
const Data_1 = require("../../Data");
const orders_enum_1 = require("../../Data/orders-enum");
const coupon_type_1 = require("../Coupon/coupon.type");
const product_type_1 = require("../Product/product.type");
const user_type_1 = __importStar(require("../User/user.type"));
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
    __metadata("design:type", String)
], OrderType.prototype, "userId", void 0);
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
__decorate([
    (0, type_graphql_1.Field)((type) => user_type_1.ShippingAddressType),
    __metadata("design:type", user_type_1.ShippingAddressType)
], OrderType.prototype, "shippingAddress", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Date, { nullable: true }),
    __metadata("design:type", Date)
], OrderType.prototype, "deliveredAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], OrderType.prototype, "shippingCharges", void 0);
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
