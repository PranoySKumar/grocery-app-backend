import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./Routes/User";
import { errorHandler } from "./Middleware/error-handler";

const app = express();

app.use(cors()); //CORS handler

app.use(express.json()); //body-parser

//registering routes
app.use("/", userRoutes);

//registering error handler.
app.use(errorHandler);

mongoose
  .connect("mongodb://localhost:27017/grocery_app")
  .then(() => {
    console.log("mongoose connected");
    app.listen(process.env.PORT || 4000);
    console.log("server started at port 4000");
  })
  .catch((error) => console.log(error));
