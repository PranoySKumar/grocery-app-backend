"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const jwt_util_1 = require("../../Utils/jwt-util");
(0, vitest_1.beforeEach)(() => {
    process.env.JWT_SECRET = "something"; // Make a copy
});
(0, vitest_1.afterEach)(() => {
    vitest_1.vi.resetModules();
});
const body = { email: "some@mail" };
(0, vitest_1.describe)("generateToken()", () => {
    (0, vitest_1.it)("should return a token string", async () => {
        const expiry = "5d";
        const token = await (0, jwt_util_1.generateToken)(body, expiry);
        (0, vitest_1.expect)(token).toBeTypeOf("string");
    });
    (0, vitest_1.it)("should not throw if no expiry time is provided", async () => {
        const token = await (0, jwt_util_1.generateToken)(body, "");
        (0, vitest_1.expect)(token).toBeTypeOf("string");
    });
});
