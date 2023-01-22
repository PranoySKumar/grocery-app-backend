import { ObjectId, Types } from "mongoose";
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
  static async addNewProduct(product: IProduct) {
    const data = { ...product };
    data.categories = data.categories?.map((item) => new Types.ObjectId(item as string));
    return await new Product(data).save();
  }

  //edit single product;
  static async updateProduct(_id: string, productDetails: IProduct) {
    productDetails.categories = productDetails.categories?.map(
      (item) => new Types.ObjectId(item as string)
    );

    return await Product.updateOne({ _id: new Types.ObjectId(_id) }, productDetails, {
      omitUndefined: true,
    });
  }

  //find products by search term
  static async findBySearchTerm(searchTerm: string) {
    return await Product.find({ name: { $regex: searchTerm, $options: "i" } });
  }

  //get single product;
  static async findProductById(productId: string) {
    const prod = await Product.findById(productId).populate("categories");

    return prod;
  }
}
