import express, { Request } from "express";
import cors from "cors";
import "reflect-metadata";
import mongoose from "mongoose";
import { errorHandler } from "./Middleware";
import dotenv from "dotenv";
import { getEnv } from "./Config";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./Graphql/User/user.resolver";
import { graphqlHTTP } from "express-graphql";
import createGraphqlContext from "./Utils/graphql-context";
import { customAuthChecker } from "./Utils/auth";
import ProductResolver from "./Graphql/Product/product.resolver";
import CategoryResolver from "./Graphql/Category/category.resolver";
import { OrderResolver } from "./Graphql/Order/order.resolver";
import { StoreResolver } from "./Graphql/Store/store.resolver";
import fileRoutes from "./Routes/file-routes";

(async () => {
  dotenv.config(); //configuring env variables

  const app = express();

  app.use(cors()); //CORS handler

  app.use(express.json()); //body-parser

  app.use(errorHandler); //registering error handler.

  //connecting to db.

  mongoose.set("strictQuery", true);
  await mongoose.connect(getEnv().DATA_BASE_URL);
  console.log("mongoose connected");
  //setting up graphql
  const schema = await buildSchema({
    resolvers: [UserResolver, ProductResolver, CategoryResolver, OrderResolver, StoreResolver],
    authChecker: customAuthChecker,
  });

  //registering graphql
  app.use(
    "/graphql",
    graphqlHTTP((req) => ({
      context: createGraphqlContext(req as Request),
      schema: schema,
      graphiql: true,
    }))
  );
  //registering routes
  app.use(fileRoutes);

  //staring server
  app.listen(process.env.PORT || 4000);
  console.log("server started at port 4000");
})();
/// remember to turn back the db url other wise local won't work
