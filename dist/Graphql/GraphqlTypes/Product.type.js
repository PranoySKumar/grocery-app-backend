"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productType = void 0;
const graphql_1 = require("graphql");
const Category_type_1 = require("./Category.type");
const quantityType = new graphql_1.GraphQLObjectType({
    name: "Quantity",
    fields() {
        return {
            type: { type: graphql_1.GraphQLString },
            value: { type: graphql_1.GraphQLFloat },
            totalQuantity: { type: graphql_1.GraphQLFloat },
        };
    },
});
exports.productType = new graphql_1.GraphQLObjectType({
    name: "Product",
    fields() {
        return {
            id: { type: graphql_1.GraphQLString },
            name: { type: graphql_1.GraphQLString },
            description: { type: graphql_1.GraphQLString },
            price: { type: graphql_1.GraphQLFloat },
            quantity: { type: quantityType, required: true },
            discount: { type: graphql_1.GraphQLFloat },
            unitsSold: { type: graphql_1.GraphQLFloat },
            imageUrl: { type: graphql_1.GraphQLString },
            categories: { type: new graphql_1.GraphQLList(Category_type_1.categoryType) },
            createdAt: { type: graphql_1.GraphQLString },
            updatedAt: { type: graphql_1.GraphQLString },
        };
    },
});
