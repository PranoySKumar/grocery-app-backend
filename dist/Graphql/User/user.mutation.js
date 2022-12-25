"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user_resolver_1 = __importDefault(require("./user.resolver"));
const user_type_1 = require("./user.type");
const locationInputType = new graphql_1.GraphQLInputObjectType({
    name: "Location",
    fields() {
        return {
            lat: { type: graphql_1.GraphQLFloat },
            lng: { type: graphql_1.GraphQLFloat },
        };
    },
});
const userMutations = new graphql_1.GraphQLObjectType({
    name: "userMutations",
    fields: {
        loginUser: {
            type: new graphql_1.GraphQLObjectType({
                name: "UserLogin",
                fields: { token: { type: graphql_1.GraphQLString }, user: { type: user_type_1.userType } },
            }),
            args: {
                phoneNumber: { type: graphql_1.GraphQLString },
                userName: { type: graphql_1.GraphQLString },
                pincode: { type: graphql_1.GraphQLInt },
                location: { type: locationInputType },
            },
            resolve: user_resolver_1.default.userLogin,
        },
    },
});
