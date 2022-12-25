"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../Utils");
class AccessVerifier {
    static async isUser(req, res, next) {
        try {
            if (req.body.tokenData.userId)
                return next();
            else
                throw new Utils_1.RequestError(401, "Not Authorized");
        }
        catch (error) {
            next(error);
        }
    }
    static async isDashboard(req, res, next) {
        try {
            if (req.body.tokenData.AdminId)
                return next();
            else
                throw new Utils_1.RequestError(401, "Not Authorized");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AccessVerifier;
