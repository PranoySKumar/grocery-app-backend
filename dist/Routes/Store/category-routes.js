"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const Controllers_1 = require("../../Controllers");
const Middleware_1 = require("../../Middleware");
const upload = (0, multer_1.default)();
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/category", Middleware_1.isAuth, Controllers_1.CategoryController.findAllCategories);
categoryRouter.patch("/category/:_id", Middleware_1.isAuth, upload.single("image"), Controllers_1.CategoryController.editCategory);
categoryRouter.put("/category", Middleware_1.isAuth, upload.single("image"), Controllers_1.CategoryController.addNewCategory);
categoryRouter.delete("/category/:_id", Middleware_1.isAuth, Controllers_1.CategoryController.deleteCategory);
categoryRouter.get("/category/:_id", Middleware_1.isAuth, Controllers_1.CategoryController.getCategory);
exports.default = categoryRouter;
