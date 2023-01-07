import { Category } from "../Models";
import { Types } from "mongoose";

export default class CategoryService {
  static async addCategory(name: string, type: string, imageUrl: string) {
    return await new Category({ name, type, imageUrl }).save();
  }

  //delete category
  static async deleteDeleteCategory(_id: string) {
    return await Category.deleteOne({ _id: new Types.ObjectId(_id) });
  }

  //updates category
  static async updateCategory(
    _id: string,
    data: { type?: string; name?: string; imageUrl?: string }
  ) {
    return await Category.findByIdAndUpdate(_id, { $set: data });
  }

  //gets all categories.
  static async getAllCategories(limit: number = 999) {
    return await Category.find().limit(limit);
  }

  //gets single category
  static async getSingleCategory(id: string) {
    return await Category.findById(id);
  }
}
