"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const userProductRoutes = (0, express_1.Router)();
userProductRoutes.get("/products", Controllers_1.ProductControllerManager.getAllProductsUserManager, Controllers_1.ProductController.getAllProducts);
userProductRoutes.get("/products/:productId", Controllers_1.ProductController.getSingleProduct);
userProductRoutes.get("/categories/:categoryId/products", Controllers_1.ProductController.getSingleCategoryProducts);
//gets discounted products
exports.default = userProductRoutes;
