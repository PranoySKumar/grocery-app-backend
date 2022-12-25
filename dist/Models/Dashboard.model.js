"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const mongoose_1 = require("mongoose");
const dashboardSchema = new mongoose_1.Schema({
    email: { type: mongoose_1.SchemaTypes.String, required: true },
    password: { type: mongoose_1.SchemaTypes.String, required: true },
}, { timestamps: true });
exports.Dashboard = (0, mongoose_1.model)("Dashboard", dashboardSchema);
