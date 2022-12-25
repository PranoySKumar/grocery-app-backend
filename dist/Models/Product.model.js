"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const Data_1 = require("../Data");
const quantitySchema = new mongoose_1.Schema({
    type: { type: String, enum: Object.values(Data_1.QuantityType), required: true },
    value: Number,
    totalQuantity: { type: Number, required: true },
}, { _id: false });
//TODO: assign categoryId using Ref
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: mongoose_1.SchemaTypes.String },
    price: { type: Number, required: true },
    quantity: { type: quantitySchema, required: true },
    discount: { type: mongoose_1.SchemaTypes.Number },
    unitsSold: { type: mongoose_1.SchemaTypes.Number, default: 0 },
    imageUrl: { type: String },
    categories: { type: [mongoose_1.SchemaTypes.ObjectId], required: true, ref: "Category", default: [] },
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)("Products", productSchema);
