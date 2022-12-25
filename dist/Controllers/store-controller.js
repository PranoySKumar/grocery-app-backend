"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Services_1 = require("../Services");
class StoreController {
    // get store profile details.
    static async getProfileDetails(req, res, next) {
        try {
            const store = await Services_1.StoreService.getStore();
            res.status(200).json(store);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = StoreController;
