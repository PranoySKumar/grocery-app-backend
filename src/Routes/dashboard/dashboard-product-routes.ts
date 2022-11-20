import { Router } from "express";
import multer from "multer";

import { ProductController } from "../../Controllers";

const upload = multer();

const dashboardProductRoutes = Router();

//store
dashboardProductRoutes.get("/products", ProductController.getAllProducts);
dashboardProductRoutes.delete(
  "/products/:productId",

  ProductController.deleteProduct
);
dashboardProductRoutes.patch(
  "/products/:productId",
  upload.single("image"),
  ProductController.editProduct
);
dashboardProductRoutes.put("/products", upload.single("image"), ProductController.addNewProduct);

export default dashboardProductRoutes;
