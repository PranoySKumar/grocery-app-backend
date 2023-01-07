"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const cloudinary_client_1 = __importDefault(require("../Utils/cloudinary-client"));
class FileController {
    async uploadImage(req, res, next) {
        try {
            const file = req.file;
            const result = await cloudinary_client_1.default.upload(file.filename, file);
            res.json({ url: result.secure_url });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.FileController = FileController;
