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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Services_1 = require("../../Services");
const Utils_1 = require("../../Utils");
const auth_1 = require("../../Utils/auth");
const coupon_type_1 = require("../Coupon/coupon.type");
const user_type_1 = __importStar(require("./user.type"));
//UserLoginInputType.
let UserLoginInput = class UserLoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "userName", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => user_type_1.LocationType, { nullable: true }),
    __metadata("design:type", user_type_1.LocationType)
], UserLoginInput.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UserLoginInput.prototype, "pincode", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "phoneNumber", void 0);
UserLoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserLoginInput);
//UserInputType
let UserInputType = class UserInputType {
};
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UserInputType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInputType.prototype, "userName", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UserInputType.prototype, "pincode", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInputType.prototype, "profileImageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => user_type_1.LocationType, { nullable: true }),
    __metadata("design:type", user_type_1.LocationType)
], UserInputType.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [coupon_type_1.CouponType], { nullable: true }),
    __metadata("design:type", Array)
], UserInputType.prototype, "coupons", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [String], { nullable: true }),
    __metadata("design:type", Array)
], UserInputType.prototype, "favourites", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [user_type_1.ShippingAddressType], { nullable: true }),
    __metadata("design:type", Array)
], UserInputType.prototype, "shippingAddresses", void 0);
UserInputType = __decorate([
    (0, type_graphql_1.InputType)()
], UserInputType);
let UserLoginResponse = class UserLoginResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserLoginResponse.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => user_type_1.default),
    __metadata("design:type", user_type_1.default)
], UserLoginResponse.prototype, "user", void 0);
UserLoginResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserLoginResponse);
let UserResolver = class UserResolver {
    constructor(userService = new Services_1.UserService()) {
        this.userService = userService;
    }
    id(user) {
        return user._id.toString();
    }
    //Query Users
    async users() {
        const users = await this.userService.findAllUsers({}, 10, 0, {});
        return users;
    }
    //Query User Details
    async user(context, id) {
        var _a;
        let user;
        if ((_a = context.tokenData) === null || _a === void 0 ? void 0 : _a.userId) {
            // if userid is there in token data use that for finding user.
            user = await this.userService.findUserById(context.tokenData.userId);
        }
        else {
            //otherwise if id is present as an arg use id for finding user.
            user = await this.userService.findUserById(id);
        }
        return user;
    }
    //Send Otp
    async sendUserOtp(phoneNumber) {
        return true;
    }
    //Verify Otp
    async verifyUserOtp(code) {
        return true;
    }
    //User Login
    async userLogin(data) {
        const { phoneNumber, userName, location, pincode } = data;
        const user = await this.userService.findUserById(phoneNumber.toString());
        //generates token.
        const token = (await (0, Utils_1.generateToken)({ userId: phoneNumber }));
        //If the user is already there just send that user's details else create a new user.
        if (user) {
            return { token, user };
        }
        else {
            const newUser = await this.userService.createUser({
                _id: phoneNumber.toString(),
                userName,
                location,
                pincode,
            });
            return { token, user: newUser };
        }
    }
    //Update User
    async updateUser(id, data) {
        await this.userService.updateUserDetails(id, data);
        return true;
    }
    //Delete User
    async deleteUser(id) {
        await this.userService.deleteUser(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "id", null);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin]),
    (0, type_graphql_1.Query)((returns) => [user_type_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin, auth_1.Role.user]),
    (0, type_graphql_1.Query)((returns) => user_type_1.default),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("id", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.Mutation)((type) => Boolean),
    __param(0, (0, type_graphql_1.Arg)("phoneNumber", (type) => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "sendUserOtp", null);
__decorate([
    (0, type_graphql_1.Mutation)((type) => Boolean),
    __param(0, (0, type_graphql_1.Arg)("code", (type) => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "verifyUserOtp", null);
__decorate([
    (0, type_graphql_1.Mutation)((type) => UserLoginResponse),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userLogin", null);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.user, auth_1.Role.admin]),
    (0, type_graphql_1.Mutation)((type) => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UserInputType]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.user, auth_1.Role.admin]),
    (0, type_graphql_1.Mutation)((type) => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)((of) => user_type_1.default),
    __metadata("design:paramtypes", [Services_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
