"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coupon_service_1 = __importDefault(require("../Services/coupon-service"));
class CouponController {
    //gets all the coupons
    static async getAllCoupons(req, res, next) {
        try {
            const coupons = await coupon_service_1.default.getAllCoupons();
            res.status(200).json(coupons);
        }
        catch (error) {
            next(error);
        }
    }
    //gets all coupons inside the coupon list of a user.
    static async getSingleUserCoupons(req, res, next) {
        try {
            const { userId } = req.params;
            const { userId: tokenUserId } = req.body.tokenData;
            const coupons = await coupon_service_1.default.getCouponsByUserId(tokenUserId !== null && tokenUserId !== void 0 ? tokenUserId : userId);
            res.status(200).json(coupons);
        }
        catch (error) {
            next(error);
        }
    }
    //create a coupon from the provided details.
    static async createCoupon(req, res, next) {
        try {
            const couponDetails = req.body;
            const newCoupon = await coupon_service_1.default.createCoupon(couponDetails);
            res.status(200).json(newCoupon);
        }
        catch (error) {
            next(error);
        }
    }
    //update coupon details.
    static async editCoupon(req, res, next) {
        try {
            const { couponId } = req.params;
            const coupons = await coupon_service_1.default.updateCouponsDetails(couponId, req.body);
            res.status(200).json(coupons);
        }
        catch (error) {
            next(error);
        }
    }
    //Adds a coupon to the user coupon list.
    static async addCouponToUser(req, res, next) {
        try {
            const { couponId, userId } = req.body;
            await coupon_service_1.default.addCouponToUserCouponList(couponId, userId);
            res.status(201).json({ addedCouponToUser: true });
        }
        catch (error) {
            next(error);
        }
    }
    //add new coupon.
    static async addNewCoupon(req, res, next) {
        try {
            const couponDetails = req.body.couponDetails;
            const coupon = await coupon_service_1.default.addNewCoupon(couponDetails);
            await coupon_service_1.default.addCouponForAllUsers(coupon._id.toString());
            res.status(201).json({ addedCouponToUser: true });
        }
        catch (error) {
            next(error);
        }
    }
    //delete single coupon
    static async deleteCoupon(req, res, next) {
        try {
            const { couponId } = req.params;
            await coupon_service_1.default.deleteCoupon(couponId);
            await coupon_service_1.default.removeCouponForAllUsers(couponId);
            res.status(201).json({ deleted: true });
        }
        catch (error) {
            next(error);
        }
    }
    //delete single coupon from user coupon list.
    static async removeCouponFromUserCouponList(req, res, next) {
        try {
            const { couponId, userId } = req.body;
            await coupon_service_1.default.removeCouponFromUserCouponList(couponId, userId);
            res.status(201).json({ deleted: true });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CouponController;
