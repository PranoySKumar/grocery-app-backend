import { Router } from "express";

import authRoutes from "./auth-routes";

const storeRouter = Router();

storeRouter.use("/store/auth", authRoutes);

export default storeRouter;
