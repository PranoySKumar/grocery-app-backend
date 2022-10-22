import { NextFunction, Request, Response } from "express";
import { AuthService } from "../Services/auth.service";

export class AuthController {
  static async login(
    req: Request<any, any, { phoneNumber: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { phoneNumber } = req.body;
      const data = await AuthService.userLogin(phoneNumber);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
