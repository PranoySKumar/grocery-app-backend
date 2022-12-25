"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const announcement_controller_1 = __importDefault(require("../../Controllers/announcement-controller"));
const userAnnouncementRoutes = (0, express_1.Router)();
userAnnouncementRoutes.get("/announcements", announcement_controller_1.default.getAllAnnouncements);
exports.default = userAnnouncementRoutes;
