import { Router } from "express";
import { ProductController } from "../../Controllers";
import { isAuthToken } from "../../Middleware";

const userProductRoutes = Router();

userProductRoutes.get("/products", isAuthToken, ProductController.getAllProducts);
userProductRoutes.get("/products/:productId", isAuthToken, ProductController.getSingleProduct);
userProductRoutes.get(
  "/category/:categoryId/products",
  isAuthToken,
  ProductController.getSingleCategoryProducts
);

export default userProductRoutes;
