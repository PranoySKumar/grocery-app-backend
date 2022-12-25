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
const Services_1 = require("../Services");
class UserAuthController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services_1.AuthService.userLogin(req.body);
                res.status(201).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static verifyPhoneNumber(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.phoneNumber);
            const result = yield Services_1.AuthService.sendUserOtp(req.params);
            res.status(200).json(result);
        });
    }
    static verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Services_1.AuthService.verifyUserOtp(req.body);
            res.status(200).json(result);
        });
    }
}
exports.default = UserAuthController;
