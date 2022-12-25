"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Coupon_schema_1 = require("./Coupon.schema");
const Product_schema_1 = require("./Product.schema");
const locationSchema = new graphql_1.GraphQLObjectType({
    name: "Location",
    fields() {
        return {
            lat: { type: graphql_1.GraphQLFloat },
            lng: { type: graphql_1.GraphQLFloat },
        };
    },
});
const shippingAddressSchema = new graphql_1.GraphQLObjectType({
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
const userSchema = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        userName: { type: graphql_1.GraphQLString },
        location: { type: locationSchema },
        shippingAddresses: { type: new graphql_1.GraphQLList(shippingAddressSchema) },
        profileImageUrl: { type: graphql_1.GraphQLString },
        coupons: { type: new graphql_1.GraphQLList(Coupon_schema_1.couponType) },
        favourites: { type: new graphql_1.GraphQLList(Product_schema_1.productType) },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
    }),
});
