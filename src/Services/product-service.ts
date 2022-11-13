import { Types } from "mongoose";
import { Category, IProduct, Product } from "../Models";

export default class ProductService {
  //get all products;
  static async getAllProducts(filter?: object, projection?: IProduct, withCategory?: boolean) {
    if (withCategory)
      return await Product.find(filter ?? {}, projection).populate(Category.modelName);
    if (!withCategory) return await Product.find(filter ?? {}, projection);
  }

  //delete new product;
  static async deleteProduct(_id: string) {
    return await Product.findByIdAndDelete(_id);
  }

  //add new product;
  static async addNewProduct(product: IProduct & { categoryId: string }) {
    const data = { ...product, categoryId: new Types.ObjectId(product.categoryId) };
    return new Product(data).save();
  }

  //edit single product;
  static async editNewProduct(_id: string, data: IProduct) {
    return Product.updateOne({ _id: new Types.ObjectId(_id) }, data, {
      runValidators: true,
      omitUndefined: true,
    });
  }

  //get single product;
  static async getProduct(filter: any, projection?: IProduct, withCategory?: boolean) {
    if (filter._id) filter._id = new Types.ObjectId(filter._id);
    if (withCategory) return await Product.findOne(filter, projection).populate(Category.modelName);
    if (!withCategory) return await Product.findOne(filter, projection);
  }
}
