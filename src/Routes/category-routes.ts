import multer from "multer";

import { RequestHandler, Router } from "express";
import { CategoryController } from "../Controllers";
import { isAuthToken } from "../Middleware";

const upload = multer();

const categoryRoutes = Router();

categoryRoutes.get(
  "/categories",
  isAuthToken,
  CategoryController.findAllCategories as RequestHandler<any, any, any, any>
);

categoryRoutes.patch(
  "/categories/:_id",
  isAuthToken,
  upload.single("image"),
  CategoryController.editCategory as RequestHandler<any>
);

categoryRoutes.put(
  "/categories",
  isAuthToken,
  upload.single("image"),
  CategoryController.addNewCategory as RequestHandler
);

categoryRoutes.delete(
  "/categories/:_id",
  isAuthToken,
  CategoryController.deleteCategory as RequestHandler<any>
);

categoryRoutes.get(
  "/categories/:_id",
  isAuthToken,
  CategoryController.getCategory as RequestHandler<any>
);

export default categoryRoutes;
