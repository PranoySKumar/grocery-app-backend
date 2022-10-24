import { ErrorRequestHandler } from "express";
import { RequestError } from "../Utils/request-error";

//Error handing middle ware.
export const errorHandler: ErrorRequestHandler = (err: RequestError | any, req, res, next) => {
  if (err instanceof RequestError) {
    res.status(err.statusCode).json({ error: { message: err.message, body: err.body } });
  } else {
    console.error(err);
    res.status(500).json({ error: { message: "Server Error" } });
  }
};
