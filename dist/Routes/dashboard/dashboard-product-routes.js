"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const Controllers_1 = require("../../Controllers");
const upload = (0, multer_1.default)();
const dashboardProductRoutes = (0, express_1.Router)();
//store
dashboardProductRoutes.get("/products", Controllers_1.ProductController.getAllProducts);
dashboardProductRoutes.delete("/products/:productId", Controllers_1.ProductController.deleteProduct);
dashboardProductRoutes.patch("/products/:productId", upload.single("image"), Controllers_1.ProductController.editProduct);
dashboardProductRoutes.put("/products", upload.single("image"), Controllers_1.ProductController.addNewProduct);
exports.default = dashboardProductRoutes;
