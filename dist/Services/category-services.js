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
        return await Models_1.Category.updateOne({ _id: new mongoose_1.Types.ObjectId(_id) }, { $set: data }, { runValidators: true, omitUndefined: true });
    }
    //gets all categories.
    static async getAllCategories(limit = 999) {
        return await Models_1.Category.find().limit(limit);
    }
    //gets single category
    static async getSingleCategory(id) {
        return await Models_1.Category.findOne();
    }
}
exports.default = CategoryService;
