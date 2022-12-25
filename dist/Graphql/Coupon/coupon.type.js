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
exports.CouponType = void 0;
const type_graphql_1 = require("type-graphql");
let CouponDiscountType = class CouponDiscountType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CouponDiscountType.prototype, "upto", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CouponDiscountType.prototype, "percentage", void 0);
CouponDiscountType = __decorate([
    (0, type_graphql_1.InputType)("CouponDiscountInputType"),
    (0, type_graphql_1.ObjectType)()
], CouponDiscountType);
let CouponType = class CouponType {
};
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.ID),
    __metadata("design:type", String)
], CouponType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CouponType.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CouponType.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => CouponDiscountType),
    __metadata("design:type", CouponDiscountType)
], CouponType.prototype, "couponDiscount", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], CouponType.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], CouponType.prototype, "updatedAt", void 0);
CouponType = __decorate([
    (0, type_graphql_1.InputType)("CouponInputType"),
    (0, type_graphql_1.ObjectType)()
], CouponType);
exports.CouponType = CouponType;
