"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const Models_1 = require("../Models");
class DashboardService {
    static async getDashboard(filter) {
        return await Models_1.Store.findOne(filter !== null && filter !== void 0 ? filter : {});
    }
    static async setPassword(password, email) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await Models_1.Dashboard.updateOne({ email }, { password: hashedPassword });
    }
}
exports.default = DashboardService;
