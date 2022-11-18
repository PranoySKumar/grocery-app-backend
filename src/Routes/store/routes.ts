import { Router } from "express";
import storeAuthRoutes from "./store-auth-routes";

const storeRoutes = Router();
storeRoutes.use(storeAuthRoutes);

export default storeRoutes;
