"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryType = void 0;
const graphql_1 = require("graphql");
exports.categoryType = new graphql_1.GraphQLObjectType({
    name: "Category",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        imageUrl: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
    }),
});
