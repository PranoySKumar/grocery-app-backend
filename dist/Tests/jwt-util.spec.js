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
const jwt_util_1 = require("../Utils/jwt-util");
(0, vitest_1.beforeEach)(() => {
    process.env.JWT_SECRET = "something"; // Make a copy
});
(0, vitest_1.afterEach)(() => {
    vitest_1.vi.resetModules();
});
const body = { email: "some@mail" };
(0, vitest_1.describe)("generateToken()", () => {
    (0, vitest_1.it)("should return a token string", () => __awaiter(void 0, void 0, void 0, function* () {
        const expiry = "5d";
        const token = yield (0, jwt_util_1.generateToken)(body, expiry);
        (0, vitest_1.expect)(token).toBeTypeOf("string");
    }));
    (0, vitest_1.it)("should not throw if no expiry time is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, jwt_util_1.generateToken)(body, "");
        (0, vitest_1.expect)(token).toBeTypeOf("string");
    }));
});
