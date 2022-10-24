import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestError } from "../Utils/request-error";

export default class AuthValidator {
  static userLoginValidators = [
    body("phoneNumber")
      .notEmpty()
      .withMessage("Please fill the required field")
      .isNumeric()
      .withMessage("Should be a 10-digit number")
      .isLength({ min: 10, max: 10 })
      .withMessage("Should be a 10-digit number"),
    this.validateErrors,
  ];

  static validateErrors(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (result.isEmpty()) {
      next();
    } else {
      next(new RequestError(406, "Not Valid Data", { validationError: result.array() }));
    }
  }
}
