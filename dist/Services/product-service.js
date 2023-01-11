"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Models_1 = require("../Models");
class ProductService {
    //get all products;
    static async findAllProducts(limit = 999, skip = 0, sort = { _id: 1 }) {
        return await Models_1.Product.find().populate("categories").limit(limit).skip(skip).sort(sort);
    }
    //get all discounted products;
    static async findAllDiscountedProducts(limit = 999) {
        return await Models_1.Product.find({ discount: { $exists: true } })
            .limit(limit)
            .sort({ discount: -1 })
            .populate("categories");
    }
    //get all discounted products;
    static async findAllCategoryProducts(categoryId, limit = 999) {
        return await Models_1.Product.find({ categories: new mongoose_1.Types.ObjectId(categoryId) })
            .limit(limit)
            .populate("categories");
    }
    //gets most sold products
    static async findMostSoldProducts(limit, projection) {
        if (limit)
            return await Models_1.Product.find({}, projection).sort({ unitsSold: 1 }).limit(limit);
        else
            return await Models_1.Product.find({}, projection).sort({ unitsSold: 1 });
    }
    //delete new product;
    static async deleteProduct(_id) {
        return await Models_1.Product.findByIdAndDelete(_id);
    }
    //add new product;
    static async addNewProduct(product) {
        const data = { ...product };
        return await new Models_1.Product(data).save();
    }
    //edit single product;
    static async editNewProduct(_id, productDetails) {
        return await Models_1.Product.updateOne({ _id: new mongoose_1.Types.ObjectId(_id) }, productDetails, {
            runValidators: true,
            omitUndefined: true,
        });
    }
    //find products by search term
    static async findBySearchTerm(searchTerm) {
        return await Models_1.Product.find({ name: { $regex: searchTerm, $options: "i" } });
    }
    //get single product;
    static async findProductById(productId) {
        const prod = await Models_1.Product.findById(productId).populate("categories");
        return prod;
    }
}
exports.default = ProductService;
