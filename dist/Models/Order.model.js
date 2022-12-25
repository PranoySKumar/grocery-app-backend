"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const Data_1 = require("../Data");
const orders_enum_1 = require("../Data/orders-enum");
const User_model_1 = require("./User.model");
const cartItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: "Products" },
    count: { type: mongoose_1.SchemaTypes.Number, required: true },
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    status: { type: String, enum: Object.values(Data_1.OrderStatus), required: true },
    transactionAmount: { type: Number, required: true },
    userId: { type: String, required: true, ref: "Users" },
    cart: { type: [cartItemSchema], required: true },
    tax: { type: mongoose_1.SchemaTypes.Number, required: true },
    couponId: { type: mongoose_1.SchemaTypes.ObjectId, ref: "Coupon" },
    shippingAddress: { type: User_model_1.addressSchema, required: true },
    orderNo: { type: mongoose_1.SchemaTypes.Number, required: true },
    paymentMethod: { type: String, required: true, enum: Object.values(orders_enum_1.PaymentMethod) },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
// const data = {
//   status: "processing",
//   transactionAmount: 500,
//   userId: ObjectId("8547917302"),
//   cart: [
//     { productId: ObjectId("638598f8056d195b2bbf5bcd"), count: 4 },
//     { productId: ObjectId("638598f8056d195b2bbf5bce"), count: 4 },
//   ],
//   tax: 20,
//   couponId: null,
// };
