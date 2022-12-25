"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Services_1 = require("../Services");
class CategoryController {
    static async findAllCategories(req, res, next) {
        try {
            const type = req.query.type; // product type.
            const limit = req.query.limit ? parseInt(req.query.limit) : undefined; // amount of products to retrieve.
            const categories = await Services_1.CategoryService.getAll(type ? { type } : {}, {}, limit);
            res.status(200).json({ categories });
        }
        catch (error) {
            next(error);
        }
    }
    //add new category
    static async addNewCategory(req, res, next) {
        try {
            const { type, name } = req.body;
            const imageUrl = await Services_1.FileService.saveImage(req.file);
            const newCategory = await Services_1.CategoryService.add(type, name, imageUrl);
            res.status(201).json(newCategory);
        }
        catch (error) {
            next(error);
        }
    }
    //edit category
    static async editCategory(req, res, next) {
        try {
            const categoryId = req.params.categoryId;
            const { type, name } = req.body;
            let imageUrl;
            const currentCategory = await Services_1.CategoryService.getOne({ _id: categoryId }, { createdAt: 0, updatedAt: 0 });
            if (req.file) {
                if (currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.imageUrl)
                    await Services_1.FileService.deleteImage("");
                imageUrl = await Services_1.FileService.saveImage(req.file);
            }
            await Services_1.CategoryService.update(categoryId, { type, name, imageUrl });
            res.status(200).json({ updated: true });
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteCategory(req, res, next) {
        try {
            const categoryId = req.params.categoryId;
            await Services_1.CategoryService.delete(categoryId);
            res.status(200).json({ deleted: true });
        }
        catch (error) {
            next(error);
        }
    }
    static async getCategory(req, res, next) {
        try {
            const { categoryId } = req.params;
            const category = await Services_1.CategoryService.getOne({ _id: new mongoose_1.Types.ObjectId(categoryId) });
            res.status(200).json({ category });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CategoryController;
