"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Services_1 = require("../Services");
class AuthController {
    static async dashboardLogin(req, res, next) {
        try {
            const data = await Services_1.AuthService.dashboardLogin(req.body);
            res.status(201).json(data);
        }
        catch (error) {
            next(error);
        }
    }
    static async userLogin(req, res, next) {
        try {
            const data = await Services_1.AuthService.userLogin(req.body);
            console.log(data);
            res.status(201).json(data);
        }
        catch (error) {
            next(error);
        }
    }
    static async userVerifyPhoneNumber(req, res, next) {
        const result = await Services_1.AuthService.sendUserOtp(req.params);
        res.status(200).json(result);
    }
    static async userVerifyOtp(req, res) {
        const result = await Services_1.AuthService.verifyUserOtp(req.body);
        res.status(200).json(result);
    }
    static async storeLogin(req, res, next) {
        try {
            const result = await Services_1.AuthService.storeLogin(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
