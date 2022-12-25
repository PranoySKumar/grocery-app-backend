"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Middleware_1 = require("../../Middleware");
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
    (0, vitest_1.it)("should set the request body with the decoded tokenised data", async () => {
        const body = { email: "some@email" };
        const token = (await (0, jwt_util_1.generateToken)(body));
        mockRequest.headers.authorization = `Bearer ${token}`;
        (0, Middleware_1.isAuthToken)(mockRequest, mockResponse, mockNextFunction);
        (0, vitest_1.expect)(mockRequest.body.tokenData.email).toEqual(body.email);
    });
    (0, vitest_1.it)("should throw Request Error if no authorised header is provided", () => {
        const fn = () => (0, Middleware_1.isAuthToken)(mockRequest, mockResponse, mockNextFunction);
        let err;
        try {
            (0, Middleware_1.isAuthToken)(mockRequest, mockResponse, mockNextFunction);
        }
        catch (error) {
            err = error;
        }
        (0, vitest_1.expect)(fn).toThrowError(request_error_1.RequestError);
        (0, vitest_1.expect)(err.statusCode).toBe(401);
    });
    (0, vitest_1.it)("should throw unauthorized error for a invalid token", () => {
        mockRequest.headers.authorization = "some token";
        const fn = () => (0, Middleware_1.isAuthToken)(mockRequest, mockResponse, mockNextFunction);
        let err;
        try {
            (0, Middleware_1.isAuthToken)(mockRequest, mockResponse, mockNextFunction);
        }
        catch (error) {
            err = error;
        }
        (0, vitest_1.expect)(fn).toThrowError(request_error_1.RequestError);
        (0, vitest_1.expect)(err.statusCode).toBe(401);
    });
    (0, vitest_1.it)("should call next function", async () => {
        const body = { email: "some@email" };
        const token = (await (0, jwt_util_1.generateToken)(body));
        mockRequest.headers.authorization = `Bearer ${token}`;
        const fn = vitest_1.vi.fn();
        (0, Middleware_1.isAuthToken)(mockRequest, mockResponse, fn);
        (0, vitest_1.expect)(fn).toBeCalled();
    });
});
