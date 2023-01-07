"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const Services_1 = require("../Services");
class FileController {
    static async uploadImage(req, res, next) {
        try {
            const file = req.file;
            const url = await Services_1.FileService.saveFile(file);
            res.json({ url });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}
exports.FileController = FileController;
