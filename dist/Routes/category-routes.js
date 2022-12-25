"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const Controllers_1 = require("../Controllers");
const Middleware_1 = require("../Middleware");
const upload = (0, multer_1.default)();
const categoryRoutes = (0, express_1.Router)();
categoryRoutes.get("/categories", Middleware_1.isAuth, Controllers_1.CategoryController.findAllCategories);
categoryRoutes.patch("/categories/:_id", Middleware_1.isAuth, upload.single("image"), Controllers_1.CategoryController.editCategory);
categoryRoutes.put("/categories", Middleware_1.isAuth, upload.single("image"), Controllers_1.CategoryController.addNewCategory);
categoryRoutes.delete("/categories/:_id", Middleware_1.isAuth, Controllers_1.CategoryController.deleteCategory);
categoryRoutes.get("/categories/:_id", Middleware_1.isAuth, Controllers_1.CategoryController.getCategory);
exports.default = categoryRoutes;
