"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const getEnv = () => {
    var _a, _b;
    return ({
        JWT_SECRET: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "some secret",
        DATA_BASE_URL: (_b = process.env.DATA_BASE_URL) !== null && _b !== void 0 ? _b : "mongodb://localhost:27017/grocery_app",
    });
};
exports.getEnv = getEnv;
