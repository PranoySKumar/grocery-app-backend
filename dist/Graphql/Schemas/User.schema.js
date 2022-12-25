"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const User_resover_1 = __importDefault(require("../Resolvers/User.resover"));
const Coupon_schema_1 = require("./Coupon.schema");
const Product_schema_1 = require("./Product.schema");
const locationType = new graphql_1.GraphQLObjectType({
    name: "Location",
    fields() {
        return {
            lat: { type: graphql_1.GraphQLFloat },
            lng: { type: graphql_1.GraphQLFloat },
        };
    },
});
const shippingAddressType = new graphql_1.GraphQLObjectType({
    name: "ShippingAddress",
    fields() {
        return {
            recipientName: { type: graphql_1.GraphQLString },
            address: { type: graphql_1.GraphQLString },
            pincode: { type: graphql_1.GraphQLString },
            landmark: { type: graphql_1.GraphQLString },
        };
    },
});
const userType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        userName: { type: graphql_1.GraphQLString },
        location: { type: locationType },
        shippingAddresses: { type: new graphql_1.GraphQLList(shippingAddressType) },
        profileImageUrl: { type: graphql_1.GraphQLString },
        coupons: { type: new graphql_1.GraphQLList(Coupon_schema_1.couponType) },
        favourites: { type: new graphql_1.GraphQLList(Product_schema_1.productType) },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
    }),
});
const userRootQuery = new graphql_1.GraphQLObjectType({
    name: "UserRootQuery",
    fields: {
        user: {
            type: userType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: User_resover_1.default.getSingleUser,
        },
    },
});
