import { Router } from "express";
import { AuthController } from "../../Controllers";

const dashboardAuthRoutes = Router();

//dashboard
//TODO: need to implement auth controller method of dashboard login.
dashboardAuthRoutes.post("/auth", AuthController.dashboardLogin);

export default dashboardAuthRoutes;
