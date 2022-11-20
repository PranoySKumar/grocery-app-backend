import { Router } from "express";

import { ProductController, StoreController } from "../../Controllers";

const storeProfileRoutes = Router();

//store
storeProfileRoutes.get("/profile", StoreController.getProfileDetails);

export default storeProfileRoutes;
