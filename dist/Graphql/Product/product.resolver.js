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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const product_service_1 = __importDefault(require("../../Services/product-service"));
const product_type_1 = require("./product.type");
let ProductsQueryInputType = class ProductsQueryInputType {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], ProductsQueryInputType.prototype, "discountFilter", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductsQueryInputType.prototype, "categoryId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], ProductsQueryInputType.prototype, "popularFilter", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ProductsQueryInputType.prototype, "searchTerm", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ProductsQueryInputType.prototype, "limit", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ProductsQueryInputType.prototype, "skip", void 0);
ProductsQueryInputType = __decorate([
    (0, type_graphql_1.InputType)()
], ProductsQueryInputType);
let ProductResolver = class ProductResolver {
    async products(options) {
        if (options.searchTerm)
            return await product_service_1.default.findBySearchTerm(options.searchTerm);
        if (options.discountFilter)
            return await product_service_1.default.findAllDiscountedProducts(options.limit);
        if (options.popularFilter)
            return await product_service_1.default.findAllProducts(options.limit, options.skip, { name: 1 });
        if (options.categoryId)
            return await product_service_1.default.findAllCategoryProducts(options.categoryId, options.limit);
        return await product_service_1.default.findAllProducts(options.limit, options.skip);
    }
    async product(id) {
        return await product_service_1.default.findProductById(id);
    }
};
__decorate([
    (0, type_graphql_1.Query)((type) => [product_type_1.ProductType]),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductsQueryInputType]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "products", null);
__decorate([
    (0, type_graphql_1.Query)((type) => product_type_1.ProductType),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "product", null);
ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProductResolver);
exports.default = ProductResolver;
