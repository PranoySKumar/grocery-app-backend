"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user_resolver_1 = __importDefault(require("./user.resolver"));
const user_type_1 = require("./user.type");
const userQueries = new graphql_1.GraphQLObjectType({
    name: "UserQueries",
    fields: {
        user: {
            type: user_type_1.userType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: user_resolver_1.default.getSingleUser,
        },
        users: {
            type: new graphql_1.GraphQLList(user_type_1.userType),
            resolve: user_resolver_1.default.getAllUsers,
        },
    },
});
exports.default = userQueries;
