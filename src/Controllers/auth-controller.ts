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
export interface StoreLoginRequestBody {
  email: string;
  password: string;
}

export default class AuthController {
  static async dashboardLogin(
    req: Request<any, any, { email: string; password: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await AuthService.dashboardLogin(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(
    req: Request<any, any, LoginRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await AuthService.userLogin(req.body);
      console.log(data);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async userVerifyPhoneNumber(
    req: Request<VerifyPhoneNumberRequestParams>,
    res: Response,
    next: NextFunction
  ) {
    const result = await AuthService.sendUserOtp(req.params);
    res.status(200).json(result);
  }

  static async userVerifyOtp(req: Request<VerifyOtpRequestParams>, res: Response) {
    const result = await AuthService.verifyUserOtp(req.body);
    res.status(200).json(result);
  }

  static async storeLogin(
    req: Request<any, any, StoreLoginRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AuthService.storeLogin(req.body);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
