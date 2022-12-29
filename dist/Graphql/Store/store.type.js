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
exports.StoreType = exports.EditingType = void 0;
const type_graphql_1 = require("type-graphql");
const auth_1 = require("../../Utils/auth");
let EditingType = class EditingType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], EditingType.prototype, "isAllowed", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], EditingType.prototype, "productAllowed", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], EditingType.prototype, "profileDetailsAllowed", void 0);
EditingType = __decorate([
    (0, type_graphql_1.ObjectType)()
], EditingType);
exports.EditingType = EditingType;
let StoreType = class StoreType {
};
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], StoreType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], StoreType.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], StoreType.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], StoreType.prototype, "phoneNumber", void 0);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)((type) => EditingType),
    __metadata("design:type", EditingType)
], StoreType.prototype, "editing", void 0);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], StoreType.prototype, "tax", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], StoreType.prototype, "deliveryTime", void 0);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], StoreType.prototype, "deliveryPartnerFee", void 0);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], StoreType.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], StoreType.prototype, "updatedAt", void 0);
StoreType = __decorate([
    (0, type_graphql_1.ObjectType)()
], StoreType);
exports.StoreType = StoreType;
