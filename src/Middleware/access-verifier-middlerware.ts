import { NextFunction, Response, Request } from "express";
import { RequestError } from "../Utils";
import { AuthTokenData } from "./jwt-verifier-middleware";

export default class AccessVerifier {
  static async isDashboard(
    req: Request<any, any, { tokenData: AuthTokenData }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (req.body.tokenData.storeId) return next();
      else throw new RequestError(401, "Not Authorized");
    } catch (error) {
      next(error);
    }
  }
  static async isUser(
    req: Request<any, any, { tokenData: AuthTokenData }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (req.body.tokenData.userId) return next();
      else throw new RequestError(401, "Not Authorized");
    } catch (error) {
      next(error);
    }
  }
  static async isDashboard(
    req: Request<any, any, { tokenData: AuthTokenData }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (req.body.tokenData.dashboardId) return next();
      else throw new RequestError(401, "Not Authorized");
    } catch (error) {
      next(error);
    }
  }
}
