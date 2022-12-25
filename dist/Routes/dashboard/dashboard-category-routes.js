"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const Controllers_1 = require("../../Controllers");
const dashboardCategoryRoutes = (0, express_1.Router)();
const upload = (0, multer_1.default)();
//store
dashboardCategoryRoutes.get("/categories", Controllers_1.CategoryController.findAllCategories);
dashboardCategoryRoutes.delete("/categories/:categoryId", Controllers_1.CategoryController.deleteCategory);
dashboardCategoryRoutes.patch("/categories/:categoryId", upload.single("image"), Controllers_1.CategoryController.editCategory);
dashboardCategoryRoutes.put("/categories", upload.single("image"), Controllers_1.CategoryController.addNewCategory);
exports.default = dashboardCategoryRoutes;
