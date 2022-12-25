"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const Controllers_1 = require("../../Controllers");
const upload = (0, multer_1.default)();
const storeProductRoutes = (0, express_1.Router)();
//store
storeProductRoutes.get("/products", Controllers_1.ProductController.getAllProducts);
storeProductRoutes.delete("/products/:productId", Controllers_1.ProductController.deleteProduct);
storeProductRoutes.patch("/products/:productId", upload.single("image"), Controllers_1.ProductController.editProduct);
storeProductRoutes.put("/products", upload.single("image"), Controllers_1.ProductController.addNewProduct);
exports.default = storeProductRoutes;
