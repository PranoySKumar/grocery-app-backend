"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllerManager = void 0;
class ProductControllerManager {
    static getAllProductsUserManager(req, res, next) {
        const { search, mostPopular, discount, limit, withCategory } = req.query;
        req.body.projection = { category: 0, unitsSold: 0 };
        const parsedLimit = limit ? parseInt(req.query.limit) : undefined;
        req.body.limit = parsedLimit;
        next();
    }
}
exports.ProductControllerManager = ProductControllerManager;
