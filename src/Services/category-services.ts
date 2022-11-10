import { Category, ICategory } from "../Models";

export default class CategoryService {
  static async add(name: string, type: string) {
    return await new Category({ name, type }).save();
  }
  static async delete(_id: string) {
    return await Category.findByIdAndDelete(_id);
  }
  static async update(_id: string, data: { type?: string; name?: string }) {
    return await Category.findByIdAndUpdate(_id, { $set: data }, { omitUndefined: true });
  }
  static async getAll(filter: object) {
    return await Category.find(filter);
  }
  static async getOne(filter: object) {
    return await Category.findOne(filter);
  }
}
