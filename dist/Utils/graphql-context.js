"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createGraphqlContext = (req) => {
    var _a;
    if (!req.headers.authorization) {
        return {};
    }
    //Token is set as "Bearer {token}" which is split to obtain the token;.
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    let decodedTokenData;
    try {
        decodedTokenData = jsonwebtoken_1.default.verify(token, (0, Config_1.getEnv)().JWT_SECRET);
    }
    catch (error) {
        return {};
    }
    return { tokenData: decodedTokenData };
};
exports.default = createGraphqlContext;
