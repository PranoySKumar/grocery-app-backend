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
exports.ProductType = void 0;
const type_graphql_1 = require("type-graphql");
const Data_1 = require("../../Data");
const auth_1 = require("../../Utils/auth");
const category_type_1 = __importDefault(require("../Category/category.type"));
let ProductQuantityType = class ProductQuantityType {
};
__decorate([
    (0, type_graphql_1.Field)(() => Data_1.QuantityType),
    __metadata("design:type", String)
], ProductQuantityType.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ProductQuantityType.prototype, "value", void 0);
ProductQuantityType = __decorate([
    (0, type_graphql_1.InputType)("ProductQuantityInputType"),
    (0, type_graphql_1.ObjectType)()
], ProductQuantityType);
let ProductType = class ProductType {
};
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.ID),
    __metadata("design:type", String)
], ProductType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProductType.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProductType.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ProductType.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ProductType.prototype, "unitsSold", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ProductType.prototype, "discount", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => ProductQuantityType),
    __metadata("design:type", ProductQuantityType)
], ProductType.prototype, "quantity", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [category_type_1.default]),
    __metadata("design:type", Array)
], ProductType.prototype, "categories", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProductType.prototype, "imageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ProductType.prototype, "isAvailable", void 0);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ProductType.prototype, "unitsAvailable", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], ProductType.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], ProductType.prototype, "updatedAt", void 0);
ProductType = __decorate([
    (0, type_graphql_1.InputType)("ProductInputType"),
    (0, type_graphql_1.ObjectType)()
], ProductType);
exports.ProductType = ProductType;
