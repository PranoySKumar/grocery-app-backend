"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = require("../Models");
const mongoose_1 = require("mongoose");
class CategoryService {
    static async addCategory(name, type, imageUrl) {
        return await new Models_1.Category({ name, type, imageUrl }).save();
    }
    //delete category
    static async deleteDeleteCategory(_id) {
        return await Models_1.Category.deleteOne({ _id: new mongoose_1.Types.ObjectId(_id) });
    }
    //updates category
    static async updateCategory(_id, data) {
        return await Models_1.Category.findByIdAndUpdate(_id, { $set: data });
    }
    //gets all categories.
    static async getAllCategories(limit = 999) {
        return await Models_1.Category.find().limit(limit);
    }
    //gets single category
    static async getSingleCategory(id) {
        return await Models_1.Category.findById(id);
    }
}
exports.default = CategoryService;
