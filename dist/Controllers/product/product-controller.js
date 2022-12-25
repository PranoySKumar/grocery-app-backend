"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Services_1 = require("../../Services");
const product_service_1 = __importDefault(require("../../Services/product-service"));
class ProductController {
    //get all products
    static async getAllProducts(req, res, next) {
        try {
            const { search, mostPopular, discount, withCategory } = req.query;
            const { limit, projection } = req.body;
            let products;
            if (discount) {
                products = await product_service_1.default.findAllDiscountedProducts(projection, limit);
            }
            else if (mostPopular) {
                products = await product_service_1.default.findMostSoldProducts(limit, projection);
            }
            else if (search) {
                products = await product_service_1.default.findBySearchTerm(search, projection);
            }
            else {
                products = await product_service_1.default.findAllProducts({}, projection);
            }
            res.status(200).json({ products });
        }
        catch (error) {
            next(error);
        }
    }
    //get single product
    static async getSingleProduct(req, res, next) {
        try {
            const productId = req.params.productId;
            const product = await product_service_1.default.findProductById(productId);
            res.status(200).json(product);
        }
        catch (error) {
            next(error);
        }
    }
    //get Single category products list
    static async getSingleCategoryProducts(req, res, next) {
        try {
            const categoryId = req.params.categoryId;
            const products = await product_service_1.default.findAllProducts({
                categories: new mongoose_1.Types.ObjectId(categoryId),
            });
            res.status(200).json({ products });
        }
        catch (error) {
            next(error);
        }
    }
    //add new product
    static async addNewProduct(req, res, next) {
        try {
            const productData = req.body;
            const imageFile = req.file;
            //parse the json data.
            if (req.body.quantity)
                productData.quantity = JSON.parse(productData.quantity);
            if (imageFile) {
                productData.imageUrl = await Services_1.FileService.saveImage(imageFile);
            }
            const product = await product_service_1.default.addNewProduct(productData);
            res.status(201).json({ product });
        }
        catch (error) {
            next(error);
        }
    }
    //delete product
    static async deleteProduct(req, res, next) {
        try {
            const { _id } = req.params;
            const deletedProduct = await product_service_1.default.deleteProduct(_id);
            if (deletedProduct === null || deletedProduct === void 0 ? void 0 : deletedProduct.imageUrl)
                await Services_1.FileService.deleteImage(deletedProduct.imageUrl);
            res.status(201).json({ deleted: true });
        }
        catch (error) {
            next(error);
        }
    }
    //edit product
    static async editProduct(req, res, next) {
        try {
            const _id = req.params._id;
            const productData = req.body;
            const imageFile = req.file;
            const currentProduct = await product_service_1.default.findProductById(_id);
            //parse the json data.
            if (req.body.quantity)
                productData.quantity = JSON.parse(productData.quantity);
            if (imageFile) {
                if (currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.imageUrl)
                    await Services_1.FileService.deleteImage(currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.imageUrl);
                productData.imageUrl = await Services_1.FileService.saveImage(imageFile);
            }
            await product_service_1.default.editNewProduct(_id, productData);
            res.status(201).json({ updated: true });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ProductController;
