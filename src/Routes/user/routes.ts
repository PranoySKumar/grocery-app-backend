import { Router } from "express";

import userAuthRoutes from "./user-auth-routes";

const userRoutes = Router();

//store
userRoutes.use(userAuthRoutes);

export default userRoutes;
