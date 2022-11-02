import { NextFunction, Request, Response } from "express";
import { AuthService } from "../Services";

export type LoginRequestBody = {
  phoneNumber: number;
  userName: string;
  pincode?: number;
  location?: { lat: number; lng: number };
};

export default class AuthController {
  static async login(req: Request<any, any, LoginRequestBody>, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.userLogin(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
