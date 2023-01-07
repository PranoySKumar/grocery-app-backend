import { Router } from "express";
import { isAuthToken } from "../Middleware";
import multer from "multer";
import { FileController } from "../Controllers/file-controller";

const upload = multer();
const fileRoutes = Router();
fileRoutes.post("/file/image", isAuthToken, upload.single("image"), FileController.uploadImage);

export default fileRoutes;
