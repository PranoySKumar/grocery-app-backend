"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Services_1 = require("../Services");
const product_service_1 = __importDefault(require("../Services/product-service"));
class ProductController {
    //get all products
    static getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { search, mostPopular, discount, limit, withCategory } = req.query;
                const { userId } = req.body.tokenData;
                let products;
                const parsedLimit = limit ? parseInt(req.query.limit) : undefined;
                // if user.
                if (userId) {
                    if (discount) {
                        products = yield product_service_1.default.findAllDiscountedProducts({ category: 0, unitsSold: 0 }, parsedLimit);
                    }
                    else if (mostPopular) {
                        products = yield product_service_1.default.findMostSoldProducts(parsedLimit, {
                            unitsSold: 0,
                            category: 0,
                        });
                    }
                    else if (search) {
                        products = yield product_service_1.default.findBySearchTerm(search, { unitsSold: 0 });
                    }
                    else {
                        products = yield product_service_1.default.findAllProducts({}, { unitsSold: 0 }, withCategory ? true : false);
                    }
                }
                res.status(200).json({ products });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //get single product
    static getSingleProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                const product = yield product_service_1.default.findProductById(productId);
                res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    //get Single category products list
    static getSingleCategoryProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.categoryId;
                const products = yield product_service_1.default.findAllProducts({
                    categories: new mongoose_1.Types.ObjectId(categoryId),
                });
                res.status(200).json({ products });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //add new product
    static addNewProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = req.body;
                const imageFile = req.file;
                //parse the json data.
                if (req.body.quantity)
                    productData.quantity = JSON.parse(productData.quantity);
                if (imageFile) {
                    productData.imageUrl = yield Services_1.FileService.saveImage(imageFile);
                }
                const product = yield product_service_1.default.addNewProduct(productData);
                res.status(201).json({ product });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //delete product
    static deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const deletedProduct = yield product_service_1.default.deleteProduct(_id);
                if (deletedProduct === null || deletedProduct === void 0 ? void 0 : deletedProduct.imageUrl)
                    yield Services_1.FileService.deleteImage(deletedProduct.imageUrl);
                res.status(201).json({ deleted: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //edit product
    static editProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params._id;
                const productData = req.body;
                const imageFile = req.file;
                const currentProduct = yield product_service_1.default.findProductById(_id);
                //parse the json data.
                if (req.body.quantity)
                    productData.quantity = JSON.parse(productData.quantity);
                if (imageFile) {
                    if (currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.imageUrl)
                        yield Services_1.FileService.deleteImage(currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.imageUrl);
                    productData.imageUrl = yield Services_1.FileService.saveImage(imageFile);
                }
                yield product_service_1.default.editNewProduct(_id, productData);
                res.status(201).json({ updated: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProductController;
