import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { Types } from "mongoose";
import { CategoryService, FileService } from "../Services";

export interface FindAllCategoriesRequestQueryParams {
  type: string;
}

export interface AddNewCategoryRequestBody {
  type: string;
  name: string;
}
export interface EditCategoryRequestParams {
  _id: string;
}

export default class CategoryController {
  static async findAllCategories(
    req: Request<any, any, any, FindAllCategoriesRequestQueryParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const type = req.query.type;
      let categories;
      if (type) {
        categories = await CategoryService.getAll({ type });
      } else {
        categories = await CategoryService.getAll();
      }
      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }

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
  static async editCategory(
    req: Request<EditCategoryRequestParams, any, AddNewCategoryRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const _id = req.params._id;
      const { type, name } = req.body;
      let imageUrl;
      if (req.file) {
        imageUrl = await FileService.saveImage(req.file);
      }
      const newCategory = await CategoryService.update(_id, { type, name, imageUrl });
      res.status(200).json(newCategory);
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
      const _id = req.params._id;

      await CategoryService.delete(_id);
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
      const _id = req.params._id;
      const category = await CategoryService.getOne({ _id: new Types.ObjectId(_id) });
      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  }
}
