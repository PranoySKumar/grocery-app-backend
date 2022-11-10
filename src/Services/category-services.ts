import { Category, ICategory } from "../Models";

class CategoryServices {
  static async addCategory(name: string, type: string) {
    return await new Category({ name, type }).save();
  }
  static async deleteCategory(_id: string) {
    return await Category.findByIdAndDelete(_id);
  }
}
