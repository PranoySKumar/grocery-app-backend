import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { authConfig } from "../Data/auth-config";
import { RequestError } from "../Utils/request-error";

//This middle ware is used to validate the token.
export const isAuth: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new RequestError(401, "Un-Authorised Request");
  }
  const token = req.headers.authorization?.split(" ")[1];
  let decodedTokenData;

  try {
    decodedTokenData = jwt.verify(token, authConfig.jwt_secret);
  } catch (error) {
    throw new RequestError(401, "Un-Authorised Request");
  }
  req.body.user = decodedTokenData;
  next();
};
