import { NextFunction, Request, Response } from "express";

import { Types } from "mongoose";
import { CategoryService, FileService } from "../Services";

export interface FindAllCategoriesRequestQueryParams {
  type: string;
  limit: string;
}

export interface AddNewCategoryRequestBody {
  type: string;
  name: string;
}
export interface EditCategoryRequestParams {
  categoryId: string;
}

export default class CategoryController {
  static async findAllCategories(
    req: Request<any, any, any, FindAllCategoriesRequestQueryParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const type = req.query.type; // product type.
      const limit = req.query.limit ? parseInt(req.query.limit) : undefined; // amount of products to retrieve.

      const categories = await CategoryService.getAll(type ? { type } : {}, {}, limit);

      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }

  //add new category
  static async addNewCategory(
    req: Request<any, any, AddNewCategoryRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { type, name } = req.body;

      const imageUrl = await FileService.saveImage(req.file!);
      const newCategory = await CategoryService.add(type, name, imageUrl);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
  //edit category
  static async editCategory(
    req: Request<EditCategoryRequestParams, any, AddNewCategoryRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categoryId = req.params.categoryId;
      const { type, name } = req.body;
      let imageUrl;

      const currentCategory = await CategoryService.getOne(
        { _id: categoryId },
        { createdAt: 0, updatedAt: 0 }
      );
      if (req.file) {
        if (currentCategory?.imageUrl) await FileService.deleteImage("");
        imageUrl = await FileService.saveImage(req.file);
      }
      await CategoryService.update(categoryId, { type, name, imageUrl });
      res.status(200).json({ updated: true });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(
    req: Request<EditCategoryRequestParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categoryId = req.params.categoryId;
      await CategoryService.delete(categoryId);
      res.status(200).json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }

  static async getCategory(
    req: Request<EditCategoryRequestParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { categoryId } = req.params;
      const category = await CategoryService.getOne({ _id: new Types.ObjectId(categoryId) });
      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  }
}
