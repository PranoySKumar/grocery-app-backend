"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const getEnv = () => {
    var _a, _b, _c, _d, _e;
    return ({
        JWT_SECRET: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "some secret",
        DATA_BASE_URL: (_b = process.env.DATA_BASE_URL) !== null && _b !== void 0 ? _b : "mongodb://localhost:27017/grocery_app",
        ClOUD_NAME: (_c = process.env.CLOUD_NAME) !== null && _c !== void 0 ? _c : "duqmb1rjh",
        API_KEY: (_d = process.env.API_KEY) !== null && _d !== void 0 ? _d : "155312536733783",
        API_SECRET: (_e = process.env.API_SECRET) !== null && _e !== void 0 ? _e : "TW2OHvIrKw5hCkpqY85GeLN9Tkc",
    });
};
exports.getEnv = getEnv;
