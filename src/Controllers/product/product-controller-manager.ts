import { NextFunction, Request, Response } from "express";

export class ProductControllerManager {
  static getAllProductsUserManager(
    req: Request<
      any,
      any,
      any,
      { search: string; mostPopular: boolean; withCategory: boolean; discount: true; limit: string }
    >,
    res: Response,
    next: NextFunction
  ) {
    const { search, mostPopular, discount, limit, withCategory } = req.query;
    req.body.projection = { category: 0, unitsSold: 0 };

    const parsedLimit = limit ? parseInt(req.query.limit) : undefined;
    req.body.limit = parsedLimit;

    next();
  }
}
