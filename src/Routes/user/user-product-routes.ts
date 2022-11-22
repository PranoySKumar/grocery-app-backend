import { Router } from "express";
import { ProductController } from "../../Controllers";
import { isAuthToken } from "../../Middleware";

const userProductRoutes = Router();

userProductRoutes.get("/products", ProductController.getAllProducts);
userProductRoutes.get("/products/:productId", ProductController.getSingleProduct);
userProductRoutes.get(
  "/category/:categoryId/products",
  ProductController.getSingleCategoryProducts
);
//gets discounted products

export default userProductRoutes;
