import { Router } from "express";

import userAuthRoutes from "./user-auth-routes";

const userRoutes = Router();

//store
userRoutes.use("/user", userAuthRoutes);

export default userRoutes;
