import { Router } from "express";
import CouponController from "../../Controllers/coupon-controller";
import { isAuthToken } from "../../Middleware";

const userCouponRoutes = Router();

userCouponRoutes.get("/coupons", CouponController.getSingleUserCoupons);

export default userCouponRoutes;
