"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const Controllers_1 = require("../Controllers");
const Middleware_1 = require("../Middleware");
const upload = (0, multer_1.default)();
const productRoutes = (0, express_1.Router)();
//get all products
productRoutes.get("/products", Middleware_1.isAuth, Controllers_1.ProductController.getAllProducts);
//get single product
productRoutes.get("/products/:_id", Middleware_1.isAuth, Controllers_1.ProductController.getSingleProduct);
//get all products of a specific category
productRoutes.get("/categories/:_id/product", Middleware_1.isAuth, Controllers_1.ProductController.getSingleCategoryProducts);
//add a new product
productRoutes.put("/products", Middleware_1.isAuth, upload.single("image"), Controllers_1.ProductController.addNewProduct);
//delete a product
productRoutes.delete("/products/:_id", Middleware_1.isAuth, Controllers_1.ProductController.deleteProduct);
//update a product
productRoutes.patch("/products/:_id", upload.single("image"), Middleware_1.isAuth, Controllers_1.ProductController.editProduct);
exports.default = productRoutes;
