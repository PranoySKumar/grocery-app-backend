"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coupon_controller_1 = __importDefault(require("../../Controllers/coupon-controller"));
const userCouponRoutes = (0, express_1.Router)();
userCouponRoutes.get("/coupons", coupon_controller_1.default.getSingleUserCoupons);
exports.default = userCouponRoutes;
