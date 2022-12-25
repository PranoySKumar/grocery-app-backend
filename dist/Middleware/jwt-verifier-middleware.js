"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = require("../Config");
const request_error_1 = require("../Utils/request-error");
//This middle ware is used to validate the token.
const isAuthToken = (req, res, next) => {
    var _a;
    if (!req.headers.authorization) {
        throw new request_error_1.RequestError(401, "no authorization token set");
    }
    //Token is set as "Bearer {token}" which is split to obtain the token;.
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    let decodedTokenData;
    try {
        decodedTokenData = jsonwebtoken_1.default.verify(token, (0, Config_1.getEnv)().JWT_SECRET);
    }
    catch (error) {
        throw new request_error_1.RequestError(401, "Un-Authorised Request");
    }
    req.body.tokenData = decodedTokenData;
    next();
};
exports.default = isAuthToken;
