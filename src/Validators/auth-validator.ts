import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestError } from "../Utils/request-error";

export default class AuthValidator {
  static userLoginValidator = [
    body("phoneNumber").notEmpty().isNumeric().isLength({ min: 10, max: 10 }),
    validationResult,
  ];

  static validateResult(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      throw new RequestError(406, "Not Valid Data", { validationError: errors.array });
    }
  }
}
