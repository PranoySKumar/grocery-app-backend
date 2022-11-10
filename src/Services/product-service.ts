import { Types } from "mongoose";
import { IProduct, Product } from "../Models";

export default class ProductService {
  //get all products;
  static async getAllProducts(filter?: object, projection?: IProduct) {
    if (!filter) {
      return await Product.find({}, projection);
    } else {
      return await Product.find(filter, projection);
    }
  }

  //delete new product;
  static async deleteProduct(_id: string) {
    return await Product.deleteOne({ _id: new Types.ObjectId(_id) });
  }

  //add new product;
  static async addNewProduct(product: IProduct) {
    return new Product(product).save();
  }

  //edit single product;
  static async editNewProduct(_id: string, data: IProduct) {
    return Product.updateOne({ _id: new Types.ObjectId(_id) }, data, {
      runValidators: true,
      omitUndefined: true,
    });
  }

  //get single product;
  static async getProduct(filter?: object, projection?: IProduct) {
    if (!filter) {
      return await Product.findOne({}, projection);
    } else {
      return await Product.findOne(filter, projection);
    }
  }
}
