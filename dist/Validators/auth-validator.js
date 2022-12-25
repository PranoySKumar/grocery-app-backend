"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const request_error_1 = require("../Utils/request-error");
class AuthValidator {
    static validateErrors(req, res, next) {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            next();
        }
        else {
            next(new request_error_1.RequestError(406, "Not Valid Data", { validationError: result.array() }));
        }
    }
}
exports.default = AuthValidator;
_a = AuthValidator;
AuthValidator.userLoginValidators = [
    (0, express_validator_1.body)("phoneNumber")
        .notEmpty()
        .withMessage("Please fill the required field")
        .isNumeric()
        .withMessage("Should be a 10-digit number")
        .isLength({ min: 10, max: 10 })
        .withMessage("Should be a 10-digit number"),
    _a.validateErrors,
];
