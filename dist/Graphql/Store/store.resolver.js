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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Models_1 = require("../../Models");
const Services_1 = require("../../Services");
const store_type_1 = require("./store.type");
let UpdateStoreInputType = class UpdateStoreInputType {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateStoreInputType.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateStoreInputType.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateStoreInputType.prototype, "phoneNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateStoreInputType.prototype, "tax", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateStoreInputType.prototype, "deviceId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateStoreInputType.prototype, "shippingCharges", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateStoreInputType.prototype, "deliveryTime", void 0);
UpdateStoreInputType = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateStoreInputType);
let StoreResolver = class StoreResolver {
    async store() {
        return await Services_1.StoreService.getStore();
    }
    async storeLogin(password, deviceId) {
        const token = (await Services_1.StoreService.checkAuth(password));
        if (token == null) {
            return null;
        }
        else {
            await Models_1.Store.updateOne({}, { $set: { deviceId } });
            return token;
        }
    }
    async updateStore(data) {
        await Services_1.StoreService.updateStore(data);
    }
    id(store) {
        return store._id.toString();
    }
};
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Query)((returns) => store_type_1.StoreType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreResolver.prototype, "store", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => String, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("password")),
    __param(1, (0, type_graphql_1.Arg)("deviceId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StoreResolver.prototype, "storeLogin", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateStoreInputType]),
    __metadata("design:returntype", Promise)
], StoreResolver.prototype, "updateStore", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((type) => String),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoreResolver.prototype, "id", null);
StoreResolver = __decorate([
    (0, type_graphql_1.Resolver)((of) => store_type_1.StoreType)
], StoreResolver);
exports.StoreResolver = StoreResolver;
