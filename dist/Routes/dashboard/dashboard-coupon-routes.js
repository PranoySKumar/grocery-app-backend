"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const dashboardCouponRoutes = (0, express_1.Router)();
//store
dashboardCouponRoutes.get("/coupons", Controllers_1.CouponController.getAllCoupons);
dashboardCouponRoutes.delete("/coupons/:couponId", Controllers_1.CouponController.deleteCoupon);
dashboardCouponRoutes.patch("/coupons", Controllers_1.CouponController.editCoupon);
dashboardCouponRoutes.put("/coupons", Controllers_1.CouponController.addNewCoupon);
exports.default = dashboardCouponRoutes;
