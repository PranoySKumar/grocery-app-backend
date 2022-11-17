import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { getEnv } from "../Config";
import { RequestError } from "../Utils/request-error";

export interface AuthTokenData {
  userId?: string;
  storeId?: string;
  dashboardId?: string;
}

//This middle ware is used to validate the token.
const isAuthToken: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new RequestError(401, "no authorization token set");
  }
  //Token is set as "Bearer {token}" which is split to obtain the token;.
  const token = req.headers.authorization?.split(" ")[1];
  let decodedTokenData;

  try {
    decodedTokenData = jwt.verify(token, getEnv().JWT_SECRET);
  } catch (error) {
    throw new RequestError(401, "Un-Authorised Request");
  }
  req.body.tokenData = decodedTokenData as AuthTokenData;
  next();
};

export default isAuthToken;
