import { NextFunction, Request, Response } from "express";
import { AuthService } from "../Services";

export type LoginRequestBody = {
  phoneNumber: number;
  userName: string;
  pincode?: number;
  location?: { lat: number; lng: number };
};

export type VerifyPhoneNumberRequestParams = {
  phoneNumber: number;
};
export type VerifyOtpRequestParams = {
  phoneNumber: number;
  code: number;
};

export default class AuthController {
  static async login(req: Request<any, any, LoginRequestBody>, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.userLogin(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async verifyPhoneNumber(
    req: Request<VerifyPhoneNumberRequestParams>,
    res: Response,
    next: NextFunction
  ) {
    console.log(req.params.phoneNumber);
    const result = await AuthService.sendOtp(req.params);
    res.status(200).json(result);
  }

  static async verifyOtp(req: Request<VerifyOtpRequestParams>, res: Response) {
    const result = await AuthService.verifyOtp(req.body);
    res.status(200).json(result);
  }
}
