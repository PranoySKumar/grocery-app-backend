import { RequestHandler, Router } from "express";
import { CategoryController } from "../../Controllers";
import { isAuthToken } from "../../Middleware";

const userCategoryRoutes = Router();

userCategoryRoutes.get(
  "/categories",
  isAuthToken,
  CategoryController.findAllCategories as RequestHandler<any, any, any, any>
);

userCategoryRoutes.get(
  "/categories/:categoryId",
  isAuthToken,
  CategoryController.getCategory as RequestHandler<any>
);

export default userCategoryRoutes;
