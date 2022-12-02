import { Router } from "express";
import { ProductController, ProductControllerManager } from "../../Controllers";
import { isAuthToken } from "../../Middleware";

const userProductRoutes = Router();

userProductRoutes.get(
  "/products",
  ProductControllerManager.getAllProductsUserManager,
  ProductController.getAllProducts
);

userProductRoutes.get("/products/:productId", ProductController.getSingleProduct);
userProductRoutes.get(
  "/categories/:categoryId/products",
  ProductController.getSingleCategoryProducts
);
//gets discounted products

export default userProductRoutes;
