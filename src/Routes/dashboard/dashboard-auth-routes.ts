import { Router } from "express";
import { AuthController } from "../../Controllers";

const dashboardAuthRoutes = Router();

//store
dashboardAuthRoutes.post("/auth", AuthController.storeLogin);

export default dashboardAuthRoutes;
