"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Models_1 = require("../Models");
class CouponService {
    //add new coupon.
    static async addNewCoupon(couponDetails) {
        const { couponDiscount, description, title } = couponDetails;
        return await new Models_1.Coupon({ couponDiscount, description, title }).save();
    }
    //gets all the coupons.
    static async getAllCoupons(filter, projection) {
        return await Models_1.Coupon.find(filter !== null && filter !== void 0 ? filter : {}, projection);
    }
    //gets all coupons inside the coupon list of a user.
    static async getCouponsByUserId(userId, projection) {
        const user = await Models_1.User.findById(userId, projection).populate("coupons");
        return user === null || user === void 0 ? void 0 : user.coupons;
    }
    //creates coupon.
    static async createCoupon(couponData) {
        return await new Models_1.Coupon({ ...couponData }).save();
    }
    //updates coupon details.
    static async updateCouponsDetails(couponId, couponData) {
        return await Models_1.Coupon.findByIdAndUpdate(couponId, { $set: { ...couponData } }, {
            runValidators: true,
            omitUndefined: true,
        });
    }
    //adds coupon to user coupon list.
    static async addCouponToUserCouponList(couponId, userId) {
        await Models_1.User.updateOne({ _id: userId }, { $push: { coupons: new mongoose_1.Types.ObjectId(couponId) } });
    }
    //removes a coupon from the user couponlist
    static async removeCouponFromUserCouponList(couponId, userId) {
        await Models_1.User.updateOne({ _id: userId }, { $pop: { coupons: new mongoose_1.Types.ObjectId(couponId) } });
    }
    //deletes a single coupon.
    static async deleteCoupon(couponId) {
        return await Models_1.Coupon.deleteOne({ _id: new mongoose_1.Types.ObjectId(couponId) });
    }
    //add coupon to all users.
    static async addCouponForAllUsers(couponId) {
        return await Models_1.User.updateMany({}, { $addToSet: { coupons: new mongoose_1.Types.ObjectId(couponId) } }, {
            runValidators: true,
            omitUndefined: true,
        });
    }
    //update  user coupon details.
    static async removeCouponForAllUsers(couponId) {
        return await Models_1.User.updateMany({}, { $pop: { coupons: new mongoose_1.Types.ObjectId(couponId) } }, {
            runValidators: true,
            omitUndefined: true,
        });
    }
}
exports.default = CouponService;
