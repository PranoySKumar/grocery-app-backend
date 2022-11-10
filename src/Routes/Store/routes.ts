import { Router } from "express";

import authRoutes from "./auth-routes";
import categoryRouter from "./category-routes";

const storeRouter = Router();

storeRouter.use("/store/auth", authRoutes);
storeRouter.use("/store", categoryRouter);

export default storeRouter;
