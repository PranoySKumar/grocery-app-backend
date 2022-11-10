import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../Services";

interface FindAllCategoriesRequestQueryParams {
  type: string;
}

interface AddNewCategoryRequestBody {
  type: string;
  name: string;
}
interface EditCategoryRequestParams {
  _id: string;
}

class CategoryController {
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
      const newCategory = await CategoryService.add(type, name);
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
      const newCategory = await CategoryService.update(_id, { type, name });
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
}
