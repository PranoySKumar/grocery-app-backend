import { RequestHandler, Router } from "express";
import multer from "multer";
import { CategoryController } from "../../Controllers";

const dashboardCategoryRoutes = Router();

const upload = multer();

//store
dashboardCategoryRoutes.get("/categories", CategoryController.findAllCategories);
dashboardCategoryRoutes.delete("/categories/:categoryId", CategoryController.deleteCategory);
dashboardCategoryRoutes.patch(
  "/categories/:categoryId",
  upload.single("image"),
  CategoryController.editCategory as RequestHandler<any>
);
dashboardCategoryRoutes.put(
  "/categories",
  upload.single("image"),
  CategoryController.addNewCategory
);

export default dashboardCategoryRoutes;
