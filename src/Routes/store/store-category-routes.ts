import { RequestHandler, Router } from "express";
import multer from "multer";
import { CategoryController } from "../../Controllers";

const storeCategoryRoutes = Router();

const upload = multer();

//store
storeCategoryRoutes.get("/categories", CategoryController.findAllCategories);
storeCategoryRoutes.delete("/categories/:categoryId", CategoryController.deleteCategory);
storeCategoryRoutes.patch(
  "/categories/:categoryId",
  upload.single("image"),
  CategoryController.editCategory as RequestHandler<any>
);
storeCategoryRoutes.put("/categories", upload.single("image"), CategoryController.addNewCategory);

export default storeCategoryRoutes;
