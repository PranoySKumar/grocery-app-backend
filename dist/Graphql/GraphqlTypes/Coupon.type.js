"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponType = void 0;
const graphql_1 = require("graphql");
const couponDiscountType = new graphql_1.GraphQLObjectType({
    name: "CouponDiscount",
    fields() {
        return { upto: { type: graphql_1.GraphQLString }, percentage: { type: graphql_1.GraphQLString } };
    },
});
exports.couponType = new graphql_1.GraphQLObjectType({
    name: "Coupon",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        couponDiscount: { type: (0, graphql_1.GraphQLList)(couponDiscountType) },
        updatedAt: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
    }),
});
