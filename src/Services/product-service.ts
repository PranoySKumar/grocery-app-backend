import { Types } from "mongoose";
import { Category, IProduct, Product } from "../Models";

export default class ProductService {
  //get all products;
  static async findAllProducts(
    limit: number = 999,
    skip: number = 0,
    sort: IProduct | any = { _id: 1 }
  ) {
    return await Product.find().populate("categories").limit(limit).skip(skip).sort(sort);
  }

  //get all discounted products;
  static async findAllDiscountedProducts(limit: number = 999) {
    return await Product.find({ discount: { $exists: true } })
      .limit(limit)
      .sort({ discount: -1 })
      .populate("categories");
  }

  //get all discounted products;
  static async findAllCategoryProducts(categoryId: string, limit: number = 999) {
    return await Product.find({ categories: new Types.ObjectId(categoryId) })
      .limit(limit)
      .populate("categories");
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

  //find products by search term
  static async findBySearchTerm(searchTerm: string) {
    return await Product.find({ name: { $regex: searchTerm, $options: "i" } });
  }

  //get single product;
  static async findProductById(productId: string) {
    console.log(productId);
    const prod = await Product.findById(productId).populate("categories");

    return prod;
  }
}
