import { Types } from "mongoose";
import { Category, IProduct, Product } from "../Models";

export default class ProductService {
  //get all products;
  static async findAllProducts(filter?: object, projection?: IProduct, withCategory?: boolean) {
    if (withCategory)
      return await Product.find(filter ?? {}, projection).populate({
        path: "categoryId",
        select: "name type",
      });
    if (!withCategory) return await Product.find(filter ?? {}, projection);
  }

  //get all products;
  static async findAllDiscountedProducts(limit?: number) {
    console.log("hey inside ");
    if (limit) return await Product.find({ discount: { $exists: true } }, {}, { limit });
    else return await Product.find({ discount: { $exists: true } });
  }

  //delete new product;
  static async deleteProduct(_id: string) {
    return await Product.findByIdAndDelete(_id);
  }

  //add new product;
  static async addNewProduct(product: IProduct & { categoryId: string }) {
    const data = { ...product, categoryId: new Types.ObjectId(product.categoryId) };
    return await new Product(data).save();
  }

  //edit single product;
  static async editNewProduct(_id: string, productDetails: IProduct) {
    return await Product.updateOne({ _id: new Types.ObjectId(_id) }, productDetails, {
      runValidators: true,
      omitUndefined: true,
    });
  }

  //get single product;
  static async findProductById(productId: string) {
    console.log(productId);
    const prod = await Product.findById(productId).populate("categoryId");

    return prod;
  }
}
