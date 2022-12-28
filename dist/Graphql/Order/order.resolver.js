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
exports.OrderResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Data_1 = require("../../Data");
const Services_1 = require("../../Services");
const auth_1 = require("../../Utils/auth");
const coupon_type_1 = require("../Coupon/coupon.type");
const user_type_1 = __importDefault(require("../User/user.type"));
const order_input_type_1 = require("./order-input.type");
const order_type_1 = require("./order.type");
let OrderResolver = class OrderResolver {
    async orders() {
        return Services_1.OrderService.getAllOrders();
    }
    async order(id) {
        return Services_1.OrderService.getSingleOrder(id);
    }
    async userOrders(userId) {
        return Services_1.OrderService.getSingleUserOrders(userId);
    }
    async addOrder(cartData) {
        const { cart, couponId, userId, shippingAddress, paymentMethod } = cartData;
        await Services_1.OrderService.createNewOrder({
            cart,
            couponId,
            userId,
            shippingAddress,
            status: Data_1.OrderStatus.placed,
            paymentMethod: paymentMethod,
        });
        return true;
    }
    async generateBill(cartData) {
        const { cart, couponId } = cartData;
        const bill = await Services_1.OrderService.calculateBill(cart, couponId);
        return bill;
    }
    async checkProductAvailability(cartData) {
        const cart = cartData;
        return await Services_1.OrderService.checkItemsAvailability(cart);
    }
    user(order) {
        return order.userId;
    }
    coupon(order) {
        return order.couponId;
    }
    id(order) {
        return order._id.toString();
    }
    cart(order) {
        return order.cart.map((item) => {
            const newProd = {
                ...item._doc,
                product: item.productId,
            };
            delete newProd.productId;
            return newProd;
        });
    }
};
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.admin]),
    (0, type_graphql_1.Query)((returns) => [order_type_1.OrderType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "orders", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Query)((returns) => order_type_1.OrderType),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "order", null);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.user]),
    (0, type_graphql_1.Query)((returns) => [order_type_1.OrderType]),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "userOrders", null);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.user, auth_1.Role.admin]),
    (0, type_graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, type_graphql_1.Arg)("cartData")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_input_type_1.AddOrderInputType]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "addOrder", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => GenerateBillQueryType),
    __param(0, (0, type_graphql_1.Arg)("cartData")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_input_type_1.GenerateBillInputType]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "generateBill", null);
__decorate([
    (0, type_graphql_1.Authorized)([auth_1.Role.user, auth_1.Role.admin]),
    (0, type_graphql_1.Query)((returns) => [ProductAvailabilityResultType]),
    __param(0, (0, type_graphql_1.Arg)("cartData", type => [order_input_type_1.CartItemInputType])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "checkProductAvailability", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((type) => user_type_1.default),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((type) => coupon_type_1.CouponType, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "coupon", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((type) => String),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "id", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((type) => [order_type_1.CartItem]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "cart", null);
OrderResolver = __decorate([
    (0, type_graphql_1.Resolver)(order_type_1.OrderType)
], OrderResolver);
exports.OrderResolver = OrderResolver;
let ProductAvailabilityResultType = class ProductAvailabilityResultType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProductAvailabilityResultType.prototype, "productId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ProductAvailabilityResultType.prototype, "unitsAvailable", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], ProductAvailabilityResultType.prototype, "isAvailable", void 0);
ProductAvailabilityResultType = __decorate([
    (0, type_graphql_1.ObjectType)()
], ProductAvailabilityResultType);
let GenerateBillQueryType = class GenerateBillQueryType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], GenerateBillQueryType.prototype, "totalAmount", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.Float),
    __metadata("design:type", Number)
], GenerateBillQueryType.prototype, "tax", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.Float),
    __metadata("design:type", Number)
], GenerateBillQueryType.prototype, "couponDiscount", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.Float),
    __metadata("design:type", Number)
], GenerateBillQueryType.prototype, "shippingCharges", void 0);
GenerateBillQueryType = __decorate([
    (0, type_graphql_1.ObjectType)()
], GenerateBillQueryType);
