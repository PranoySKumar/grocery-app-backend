import multer from "multer";

import { RequestHandler, Router } from "express";
import { CategoryController } from "../../Controllers";
import { isAuthToken } from "../../Middleware";

const userCategoryRoutes = Router();

userCategoryRoutes.get(
  "/user/categories",
  isAuthToken,
  CategoryController.findAllCategories as RequestHandler<any, any, any, any>
);

userCategoryRoutes.get(
  "/user/categories/:_id",
  isAuthToken,
  CategoryController.getCategory as RequestHandler<any>
);

export default userCategoryRoutes;
