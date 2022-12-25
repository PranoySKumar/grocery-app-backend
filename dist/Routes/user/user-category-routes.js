"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const userCategoryRoutes = (0, express_1.Router)();
userCategoryRoutes.get("/categories", Controllers_1.CategoryController.findAllCategories);
userCategoryRoutes.get("/categories/:categoryId", Controllers_1.CategoryController.getCategory);
exports.default = userCategoryRoutes;
