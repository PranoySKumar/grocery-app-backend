import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { IProduct } from "../Models";
import ProductService from "../Services/product-service";

export default class ProductController {
  //get single product
  static async getSingleProduct(req: Request<{ _id: string }>, res: Response, next: NextFunction) {
    try {
      const _id = req.params._id;

      const product = await ProductService.getProduct({ _id: new Types.ObjectId(_id) });
      res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  }

  //get Single category products list
  static async getSingleCategoryProducts(
    req: Request<{ categoryId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categoryId = req.params.categoryId;
      const products = await ProductService.getAllProducts({
        categoryId: new Types.ObjectId(categoryId),
      });
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }

  //add new product
  static async addNewProduct(req: Request<any, any, IProduct>, res: Response, next: NextFunction) {
    try {
      const productData = req.body;
      const product = await ProductService.addNewProduct(productData);

      res.status(201).json({ product });
    } catch (error) {
      next(error);
    }
  }

  //delete product
  static async deleteProduct(req: Request<{ _id: string }>, res: Response, next: NextFunction) {
    try {
      const { _id } = req.body;
      await ProductService.deleteProduct(_id);

      res.status(201).json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }

  //edit product
  static async editProduct(
    req: Request<{ _id: string }, any, IProduct>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const _id = req.params._id;
      const data = req.body;
      await ProductService.editNewProduct(_id, data);

      res.status(201).json({ updated: true });
    } catch (error) {
      next(error);
    }
  }
}
