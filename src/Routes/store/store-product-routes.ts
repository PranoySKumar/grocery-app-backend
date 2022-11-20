import { Router } from "express";
import multer from "multer";

import { ProductController } from "../../Controllers";

const upload = multer();

const storeProductRoutes = Router();

//store
storeProductRoutes.get("/products", ProductController.getAllProducts);
storeProductRoutes.delete(
  "/products/:productId",

  ProductController.deleteProduct
);
storeProductRoutes.patch(
  "/products/:productId",
  upload.single("image"),
  ProductController.editProduct
);
storeProductRoutes.put("/products", upload.single("image"), ProductController.addNewProduct);

export default storeProductRoutes;
