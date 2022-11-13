import { Router } from "express";
import multer from "multer";

import { ProductController } from "../Controllers";
import { isAuth } from "../Middleware";

const upload = multer();

const productRoutes = Router();

//get all products
productRoutes.get("/products", isAuth, ProductController.getAllProducts);

//get single product
productRoutes.get("/products/:_id", isAuth, ProductController.getSingleProduct);

//get all products of a specific category
productRoutes.get("/categories/:_id/product", isAuth, ProductController.getSingleCategoryProducts);

//add a new product
productRoutes.put("/products", isAuth, upload.single("image"), ProductController.addNewProduct);

//delete a product
productRoutes.delete("/products/:_id", isAuth, ProductController.deleteProduct);

//update a product
productRoutes.patch(
  "/products/:_id",
  upload.single("image"),
  isAuth,
  ProductController.editProduct
);

export default productRoutes;
