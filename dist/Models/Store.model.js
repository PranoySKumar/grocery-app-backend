"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = require("mongoose");
const editingSchema = new mongoose_1.Schema({
    isAllowed: { type: mongoose_1.SchemaTypes.Boolean, default: true },
    productAllowed: { type: mongoose_1.SchemaTypes.Boolean, default: true },
    profileDetailsAllowed: { type: mongoose_1.SchemaTypes.Boolean, default: true },
}, { _id: false });
const storeSchema = new mongoose_1.Schema({
    name: { type: mongoose_1.SchemaTypes.String, required: true },
    email: { type: mongoose_1.SchemaTypes.String, required: true },
    phoneNumber: { type: mongoose_1.SchemaTypes.Number, required: true },
    password: { type: mongoose_1.SchemaTypes.String, required: true },
    tax: { type: mongoose_1.SchemaTypes.Number, required: true, default: 0 },
    editing: editingSchema,
    deliveryPartnerFee: { type: mongoose_1.SchemaTypes.Number, required: true, default: 0 },
    deliveryTimeSlots: {
        type: [{ start: mongoose_1.SchemaTypes.String, end: mongoose_1.SchemaTypes.String }],
        default: [],
    },
}, { timestamps: true });
exports.Store = (0, mongoose_1.model)("Store", storeSchema);
