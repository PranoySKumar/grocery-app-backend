"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const auth_service_1 = require("../../Services/auth-service");
let phoneNumber = 01234567;
89;
(0, vitest_1.describe)("userLogin()", () => {
    auth_service_1.AuthService.userLogin(phoneNumber);
});
