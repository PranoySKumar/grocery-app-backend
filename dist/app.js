"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const mongoose_1 = __importDefault(require("mongoose"));
const Middleware_1 = require("./Middleware");
const dotenv_1 = __importDefault(require("dotenv"));
const Config_1 = require("./Config");
const type_graphql_1 = require("type-graphql");
const user_resolver_1 = require("./Graphql/User/user.resolver");
const express_graphql_1 = require("express-graphql");
const graphql_context_1 = __importDefault(require("./Utils/graphql-context"));
const auth_1 = require("./Utils/auth");
const product_resolver_1 = __importDefault(require("./Graphql/Product/product.resolver"));
const category_resolver_1 = __importDefault(require("./Graphql/Category/category.resolver"));
const order_resolver_1 = require("./Graphql/Order/order.resolver");
const store_resolver_1 = require("./Graphql/Store/store.resolver");
(async () => {
    dotenv_1.default.config(); //configuring env variables
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)()); //CORS handler
    app.use(express_1.default.json()); //body-parser
    app.use(Middleware_1.errorHandler); //registering error handler.
    //connecting to db.
    await mongoose_1.default.connect((0, Config_1.getEnv)().DATA_BASE_URL);
    console.log("mongoose connected");
    //setting up graphql
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [user_resolver_1.UserResolver, product_resolver_1.default, category_resolver_1.default, order_resolver_1.OrderResolver, store_resolver_1.StoreResolver],
        authChecker: auth_1.customAuthChecker,
    });
    app.use("/graphql", (0, express_graphql_1.graphqlHTTP)((req) => ({
        context: (0, graphql_context_1.default)(req),
        schema: schema,
        graphiql: true,
    })));
    //staring server
    app.listen(process.env.PORT || 4000);
    console.log("server started at port 4000");
})();
/// remember to turn back the db url other wise local won't work
