import { Router } from "express";
import authRoutes from "./auth-routes";
import categoryRoutes from "./category-routes";

//user
const routes = Router();
routes.use(authRoutes);
routes.use(categoryRoutes);

export default routes;
