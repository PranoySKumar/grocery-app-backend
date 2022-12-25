"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = require("mongoose");
const couponDiscountSchema = new mongoose_1.Schema({
    upto: { type: Number, required: true },
    percentage: { type: Number, required: true },
}, { _id: false });
const couponSchema = new mongoose_1.Schema({
    title: { type: mongoose_1.SchemaTypes.String, required: true },
    description: { type: mongoose_1.SchemaTypes.String, required: true },
    couponDiscount: { type: couponDiscountSchema, required: true },
}, { timestamps: true });
exports.Coupon = (0, mongoose_1.model)("Coupon", couponSchema);
