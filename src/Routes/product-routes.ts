import { Router } from "express";
import { ProductController } from "../Controllers";
import { isAuth } from "../Middleware";

//user
const productRoutes = Router();

productRoutes.get("/product/:_id", isAuth, ProductController.getSingleProduct);
productRoutes.get("/product/category/:_id", isAuth, ProductController.getSingleCategoryProducts);
productRoutes.put("/product", isAuth, ProductController.addNewProduct);
productRoutes.delete("/product/:_id", isAuth, ProductController.deleteProduct);
productRoutes.patch("/product/:_id", isAuth, ProductController.editProduct);

export default productRoutes;
