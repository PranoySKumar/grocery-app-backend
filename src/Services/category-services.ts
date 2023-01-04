import { Category, ICategory } from "../Models";
import { Types } from "mongoose";
import { FileService } from "./";

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
    return await Category.updateOne(
      { _id: new Types.ObjectId(_id) },
      { $set: data },
      { runValidators: true, omitUndefined: true }
    );
  }

  //gets all categories.
  static async getAllCategories(limit: number = 999) {
    return await Category.find().limit(limit);
  }

  //gets single category
  static async getSingleCategory(id: string) {
    return await Category.findOne();
  }
}
