"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const Controllers_1 = require("../../Controllers");
const storeCategoryRoutes = (0, express_1.Router)();
const upload = (0, multer_1.default)();
//store
storeCategoryRoutes.get("/categories", Controllers_1.CategoryController.findAllCategories);
storeCategoryRoutes.delete("/categories/:categoryId", Controllers_1.CategoryController.deleteCategory);
storeCategoryRoutes.patch("/categories/:categoryId", upload.single("image"), Controllers_1.CategoryController.editCategory);
storeCategoryRoutes.put("/categories", upload.single("image"), Controllers_1.CategoryController.addNewCategory);
exports.default = storeCategoryRoutes;
