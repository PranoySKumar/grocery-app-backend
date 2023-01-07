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
const Services_1 = require("../../Services");
const auth_1 = require("../../Utils/auth");
const cloudinary_client_1 = __importDefault(require("../../Utils/cloudinary-client"));
const category_type_1 = __importDefault(require("./category.type"));
let CategoryResolver = class CategoryResolver {
    async categories(limit) {
        return await Services_1.CategoryService.getAllCategories(limit);
    }
    async category(id) {
        return await Services_1.CategoryService.getSingleCategory(id);
    }
    async addCategory(name, image) {
        try {
            const res = await cloudinary_client_1.default.upload(image, {});
            return await Services_1.CategoryService.addCategory(name, "meat", res.secure_url);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async updateCategory(id, name, image) {
        try {
            if (image) {
                const response = await cloudinary_client_1.default.upload(image, {});
                const category = await Services_1.CategoryService.updateCategory(id, {
                    name,
                    imageUrl: response.secure_url,
                });
                await cloudinary_client_1.default.destroy(category === null || category === void 0 ? void 0 : category.imageUrl.split("/").slice(-1)[0].split(".")[0]);
            }
            else {
                await Services_1.CategoryService.updateCategory(id, { name });
            }
            return Services_1.CategoryService.getSingleCategory(id);
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)((type) => [category_type_1.default]),
    __param(0, (0, type_graphql_1.Arg)("limit", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "categories", null);
__decorate([
    (0, type_graphql_1.Query)((type) => category_type_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "category", null);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Mutation)((type) => category_type_1.default),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("image")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "addCategory", null);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.store]),
    (0, type_graphql_1.Mutation)((type) => category_type_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("name", { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("image", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategory", null);
CategoryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CategoryResolver);
exports.default = CategoryResolver;
