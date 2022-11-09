import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRoutes } from "./Routes";
import { errorHandler } from "./Middleware";
import dotenv from "dotenv";
import { getEnv } from "./Config";
import path from "path";

dotenv.config(); //configuring env variables

const app = express();

app.use(cors()); //CORS handler

app.use(express.json()); //body-parser
app.get("/image/fish", (req, res) =>
  res.status(200).sendFile(path.join(process.cwd(), "fish.jpg"))
);

app.use("/", UserRoutes); //registering routes

app.use(errorHandler); //registering error handler.

mongoose
  .connect(getEnv().DATA_BASE_URL)
  .then(() => {
    console.log("mongoose connected");
    app.listen(process.env.PORT || 4000);
    console.log("server started at port 4000");
  })
  .catch((error) => console.log(error));
