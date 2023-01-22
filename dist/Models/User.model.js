"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.addressSchema = void 0;
const mongoose_1 = require("mongoose");
const Data_1 = require("../Data");
const Coupon_model_1 = require("./Coupon.model");
const Product_model_1 = require("./Product.model");
exports.addressSchema = new mongoose_1.Schema({
    address: { type: mongoose_1.SchemaTypes.String, required: true },
    pincode: { type: mongoose_1.SchemaTypes.Number, required: true },
    landmark: { type: mongoose_1.SchemaTypes.String },
    recipientName: { type: mongoose_1.SchemaTypes.String, required: true },
    type: { type: mongoose_1.SchemaTypes.String, enum: Object.values(Data_1.AddressType), required: true },
}, { _id: false });
const userSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.SchemaTypes.String, required: true },
    userName: mongoose_1.SchemaTypes.String,
    shippingAddresses: { type: [exports.addressSchema], default: [] },
    pincode: Number,
    deviceId: String,
    location: { type: { lat: mongoose_1.SchemaTypes.Number, lng: mongoose_1.SchemaTypes.Number } },
    favourites: { type: [mongoose_1.SchemaTypes.ObjectId], ref: Product_model_1.Product.modelName, default: [] },
    profileImageUrl: mongoose_1.SchemaTypes.String,
    coupons: { type: [mongoose_1.SchemaTypes.ObjectId], ref: Coupon_model_1.Coupon.modelName, default: [] },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("Users", userSchema);
