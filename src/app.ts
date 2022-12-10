import express from "express";
import cors from "cors";
import "reflect-metadata";
import mongoose from "mongoose";
import { errorHandler } from "./Middleware";
import dotenv from "dotenv";
import { getEnv } from "./Config";
import path from "path";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./Graphql/User/user.resolver";
import { graphqlHTTP } from "express-graphql";

(async () => {
  dotenv.config(); //configuring env variables

  const app = express();

  app.use(cors()); //CORS handler

  app.use(express.json()); //body-parser

  //setting up graphql
  const schema = await buildSchema({ resolvers: [UserResolver] });
  app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));

  app.use(errorHandler); //registering error handler.

  //connecting to db.
  await mongoose.connect(getEnv().DATA_BASE_URL);
  console.log("mongoose connected");

  //staring server
  app.listen(process.env.PORT || 4000);
  console.log("server started at port 4000");
})();
