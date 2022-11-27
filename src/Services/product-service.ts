import { Types } from "mongoose";
import { Category, IProduct, Product } from "../Models";

export default class ProductService {
  //get all products;
  static async findAllProducts(
    filter?: object,
    projection?: object | IProduct,
    withCategory?: boolean
  ) {
    return await Product.find(filter ?? {}, projection).populate(withCategory ? "category" : "");
  }

  //get all discounted products;
  static async findAllDiscountedProducts(projection?: object | IProduct, limit?: number) {
    if (limit)
      return await Product.find({ discount: { $exists: true } }, projection)
        .limit(limit)
        .sort({ discount: -1 });
    else
      return await Product.find({ discount: { $exists: true } }, projection).sort({ discount: -1 });
  }

  //gets most sold products
  static async findMostSoldProducts(limit?: number, projection?: object | IProduct) {
    if (limit) return await Product.find({}, projection).sort({ unitsSold: 1 }).limit(limit);
    else return await Product.find({}, projection).sort({ unitsSold: 1 });
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
    const prod = await Product.findById(productId).populate("category");

    return prod;
  }
}
