"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const Models_1 = require("../Models");
const Utils_1 = require("../Utils");
class StoreService {
    static async getStore(filter) {
        return await Models_1.Store.findOne(filter !== null && filter !== void 0 ? filter : {});
    }
    static async setPassword(password) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await Models_1.Store.updateOne({ name: "grocery" }, { password: hashedPassword });
    }
    static async checkAuth(password) {
        const store = await this.getStore();
        const result = await bcrypt_1.default.compare(password, store === null || store === void 0 ? void 0 : store.password);
        if (!result) {
            return null;
        }
        return await (0, Utils_1.generateToken)({ storeId: store === null || store === void 0 ? void 0 : store._id });
    }
}
exports.default = StoreService;
