"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileService {
    static async saveImage(file) {
        return `${file.originalname} ${file.size}`;
    }
    static async deleteImage(url) {
        return Promise.resolve("deleted");
    }
}
exports.default = FileService;
