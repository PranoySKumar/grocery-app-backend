import { Router } from "express";

import { ProductController, StoreController } from "../../Controllers";

const dashboardProfileRoutes = Router();

//store
dashboardProfileRoutes.get("/profile", StoreController.getProfileDetails);

export default dashboardProfileRoutes;
