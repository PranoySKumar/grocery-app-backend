import { getEnv } from "../Config";
import jwt from "jsonwebtoken";
import { AuthTokenData } from "../Middleware";
import { Request } from "express";

export interface GraphqlContext {
  tokenData?: AuthTokenData;
}

const createGraphqlContext = (req: Request) => {
  if (!req.headers.authorization) {
    return {};
  }
  //Token is set as "Bearer {token}" which is split to obtain the token;.
  const token = req.headers.authorization?.split(" ")[1];
  let decodedTokenData;

  try {
    decodedTokenData = jwt.verify(token, getEnv().JWT_SECRET);
  } catch (error) {
    return {};
  }
  return { tokenData: decodedTokenData };
};

export default createGraphqlContext;
