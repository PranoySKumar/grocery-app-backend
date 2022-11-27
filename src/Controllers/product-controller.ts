import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { AuthTokenData } from "../Middleware";
import { IProduct, Product } from "../Models";
import { FileService } from "../Services";
import ProductService from "../Services/product-service";

export default class ProductController {
  //get all products
  static async getAllProducts(
    req: Request<
      any,
      any,
      { tokenData: AuthTokenData },
      { mostPopular: boolean; withCategory: boolean; discount: true; limit: string }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { mostPopular, discount, limit, withCategory } = req.query;
      const { userId } = req.body.tokenData;
      let products;
      const parsedLimit = limit ? parseInt(req.query.limit) : undefined;

      // if user.
      if (userId) {
        if (discount) {
          products = await ProductService.findAllDiscountedProducts(
            { category: 0, unitsSold: 0 },
            parsedLimit
          );
        } else if (mostPopular) {
          products = await ProductService.findMostSoldProducts(parsedLimit, {
            unitsSold: 0,
            category: 0,
          });
        } else {
          products = await ProductService.findAllProducts(
            {},
            { unitsSold: 0 },
            withCategory ? true : false
          );
        }
      }

      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }

  //get single product
  static async getSingleProduct(
    req: Request<{ productId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productId = req.params.productId;

      const product = await ProductService.findProductById(productId);
      res.status(200).json(product);
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
      const products = await ProductService.findAllProducts({
        categoryId: new Types.ObjectId(categoryId),
      });
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }

  //add new product
  static async addNewProduct(
    req: Request<any, any, IProduct & { categoryId: string; discount: string; quantity: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productData = req.body;
      const imageFile = req.file;

      //parse the json data.
      if (req.body.quantity) productData.quantity = JSON.parse(productData.quantity);

      if (imageFile) {
        productData.imageUrl = await FileService.saveImage(imageFile);
      }
      const product = await ProductService.addNewProduct(productData);

      res.status(201).json({ product });
    } catch (error) {
      next(error);
    }
  }

  //delete product
  static async deleteProduct(req: Request<{ _id: string }>, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;
      const deletedProduct = await ProductService.deleteProduct(_id);
      if (deletedProduct?.imageUrl) await FileService.deleteImage(deletedProduct!.imageUrl);
      res.status(201).json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }

  //edit product
  static async editProduct(
    req: Request<
      { _id: string },
      any,
      IProduct & { categoryId: string; discount: string; quantity: string }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const _id = req.params._id;
      const productData = req.body;
      const imageFile = req.file;

      const currentProduct = await ProductService.findProductById(_id);

      //parse the json data.

      if (req.body.quantity) productData.quantity = JSON.parse(productData.quantity);

      if (imageFile) {
        if (currentProduct?.imageUrl) await FileService.deleteImage(currentProduct?.imageUrl!);
        productData.imageUrl = await FileService.saveImage(imageFile);
      }
      await ProductService.editNewProduct(_id, productData);
      res.status(201).json({ updated: true });
    } catch (error) {
      next(error);
    }
  }
}
