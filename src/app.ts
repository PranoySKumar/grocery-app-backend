import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./Routes";

const app = express();

app.use(cors()); //CORS handler

app.use(express.json()); //body-parser

app.use("/", routes);

mongoose
  .connect("mongodb://localhost:27017/grocery_app")
  .then(() => {
    console.log("mongoose connected");
    app.listen(process.env.PORT || 4000);
    console.log("server started at port 4000");
  })
  .catch((error) => console.log(error));
