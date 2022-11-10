import { Category, ICategory } from "../Models";

class CategoryServices {
  static async addCategory(name: string, type: string) {
    return await new Category({ name, type });
  }
}
