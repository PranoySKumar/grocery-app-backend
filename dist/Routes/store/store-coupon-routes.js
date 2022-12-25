"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const storeCouponRoutes = (0, express_1.Router)();
//store
storeCouponRoutes.get("/coupons", Controllers_1.CouponController.getAllCoupons);
storeCouponRoutes.delete("/coupons/:couponId", Controllers_1.CouponController.deleteCoupon);
storeCouponRoutes.patch("/coupons", Controllers_1.CouponController.editCoupon);
storeCouponRoutes.put("/coupons", Controllers_1.CouponController.addNewCoupon);
exports.default = storeCouponRoutes;
