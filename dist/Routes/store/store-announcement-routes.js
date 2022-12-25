"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const announcement_controller_1 = __importDefault(require("../../Controllers/announcement-controller"));
const storeAnnouncementRoutes = (0, express_1.Router)();
storeAnnouncementRoutes.post("/announcements", announcement_controller_1.default.createAnnouncement);
storeAnnouncementRoutes.get("/announcements", announcement_controller_1.default.getAllAnnouncements);
exports.default = storeAnnouncementRoutes;
