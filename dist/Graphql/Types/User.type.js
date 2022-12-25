"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Coupon_type_1 = require("./Coupon.type");
const Product_type_1 = require("./Product.type");
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
        coupons: { type: new graphql_1.GraphQLList(Coupon_type_1.couponType) },
        favourites: { type: new graphql_1.GraphQLList(Product_type_1.productType) },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
    }),
});
