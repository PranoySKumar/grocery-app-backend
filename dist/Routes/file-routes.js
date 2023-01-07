"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const file_controller_1 = require("../Controllers/file-controller");
const upload = (0, multer_1.default)();
const fileRoutes = (0, express_1.Router)();
fileRoutes.post("/file/image", upload.single("image"), file_controller_1.FileController.uploadImage);
exports.default = fileRoutes;