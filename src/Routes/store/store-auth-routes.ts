import { Router } from "express";
import { AuthController } from "../../Controllers";

const storeAuthRoutes = Router();

//store
storeAuthRoutes.post("/auth", AuthController.storeLogin);

export default storeAuthRoutes;
