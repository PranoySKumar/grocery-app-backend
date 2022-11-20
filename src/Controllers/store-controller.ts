import { NextFunction, Request, Response } from "express";
import { StoreService } from "../Services";

export default class StoreController {
  // get store profile details.
  static async getProfileDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await StoreService.getStore();
      res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
}
