import { Category, ICategory } from "../Models";
import { Types } from "mongoose";
import { FileService } from "./";

export default class CategoryService {
  static async add(name: string, type: string, imageUrl: string) {
    return await new Category({ name, type, imageUrl }).save();
  }
  static async delete(_id: string) {
    return await Category.deleteOne({ _id: new Types.ObjectId(_id) });
  }
  static async update(_id: string, data: { type?: string; name?: string; imageUrl?: string }) {
    return await Category.updateOne(
      { _id: new Types.ObjectId(_id) },
      { $set: data },
      { runValidators: true, omitUndefined: true }
    );
  }
  static async getAll(filter?: object, projection?: object) {
    if (filter) {
      return await Category.find(filter, projection);
    }
    return await Category.find();
  }
  static async getOne(filter?: object, projection?: Object) {
    if (filter) {
      return await Category.findOne(filter, projection);
    }
    return await Category.findOne({}, projection);
  }
}
