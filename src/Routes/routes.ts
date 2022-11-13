import { Router } from "express";
import authRoutes from "./auth-routes";
import categoryRoutes from "./category-routes";
import productRoutes from "./product-routes";

//user
const routes = Router();
routes.use(authRoutes);
routes.use(categoryRoutes);
routes.use(productRoutes);

export default routes;
