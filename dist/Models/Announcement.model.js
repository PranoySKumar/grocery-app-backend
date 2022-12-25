"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcement = void 0;
const mongoose_1 = require("mongoose");
const announcementSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true, capped: { max: 30 } });
exports.Announcement = (0, mongoose_1.model)("Announcement", announcementSchema);
