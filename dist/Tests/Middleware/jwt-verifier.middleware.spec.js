"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const jwt_verifier_middleware_1 = require("../../Middleware/jwt-verifier.middleware");
const jwt_util_1 = require("../../Utils/jwt-util");
const request_error_1 = require("../../Utils/request-error");
let mockRequest = { headers: {} };
let mockResponse = {};
let mockNextFunction = () => { };
(0, vitest_1.beforeEach)(() => {
    process.env.JWT_SECRET = "some_secret";
    mockRequest = { body: {}, headers: {} };
    mockResponse = {};
    mockNextFunction = () => { };
});
(0, vitest_1.afterEach)(() => {
    vitest_1.vi.resetModules();
});
(0, vitest_1.describe)("isAuth()", () => {
    (0, vitest_1.it)("should set the request body with the decoded tokenised data", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = { email: "some@email" };
        const token = (yield (0, jwt_util_1.generateToken)(body));
        mockRequest.headers.authorization = `Bearer ${token}`;
        (0, jwt_verifier_middleware_1.isAuth)(mockRequest, mockResponse, mockNextFunction);
        (0, vitest_1.expect)(mockRequest.body.user.email).toEqual(body.email);
    }));
    (0, vitest_1.it)("should throw Request Error if no authorised header is provided", () => {
        const fn = () => (0, jwt_verifier_middleware_1.isAuth)(mockRequest, mockResponse, mockNextFunction);
        let err;
        try {
            (0, jwt_verifier_middleware_1.isAuth)(mockRequest, mockResponse, mockNextFunction);
        }
        catch (error) {
            err = error;
        }
        (0, vitest_1.expect)(fn).toThrowError(request_error_1.RequestError);
        (0, vitest_1.expect)(err.statusCode).toBe(401);
    });
    (0, vitest_1.it)("should throw unauthorized error for a invalid token", () => {
        mockRequest.headers.authorization = "some token";
        const fn = () => (0, jwt_verifier_middleware_1.isAuth)(mockRequest, mockResponse, mockNextFunction);
        let err;
        try {
            (0, jwt_verifier_middleware_1.isAuth)(mockRequest, mockResponse, mockNextFunction);
        }
        catch (error) {
            err = error;
        }
        (0, vitest_1.expect)(fn).toThrowError(request_error_1.RequestError);
        (0, vitest_1.expect)(err.statusCode).toBe(401);
    });
    (0, vitest_1.it)("should call next function", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = { email: "some@email" };
        const token = (yield (0, jwt_util_1.generateToken)(body));
        mockRequest.headers.authorization = `Bearer ${token}`;
        const fn = vitest_1.vi.fn();
        (0, jwt_verifier_middleware_1.isAuth)(mockRequest, mockResponse, fn);
        (0, vitest_1.expect)(fn).toBeCalled();
    }));
});
