import multer from "multer";

import { RequestHandler, Router } from "express";
import { CategoryController } from "../Controllers";
import { isAuth } from "../Middleware";

const upload = multer();

const categoryRoutes = Router();

categoryRoutes.get(
  "/category",
  isAuth,
  CategoryController.findAllCategories as RequestHandler<any, any, any, any>
);

categoryRoutes.patch(
  "/category/:_id",
  isAuth,
  upload.single("image"),
  CategoryController.editCategory as RequestHandler<any>
);

categoryRoutes.put(
  "/category",
  isAuth,
  upload.single("image"),
  CategoryController.addNewCategory as RequestHandler
);

categoryRoutes.delete(
  "/category/:_id",
  isAuth,
  CategoryController.deleteCategory as RequestHandler<any>
);

categoryRoutes.get("/category/:_id", isAuth, CategoryController.getCategory as RequestHandler<any>);

export default categoryRoutes;
