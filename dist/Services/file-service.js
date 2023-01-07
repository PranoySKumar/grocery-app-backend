"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const cloudinary_client_1 = __importDefault(require("../Utils/cloudinary-client"));
const cloudinary_client_2 = __importDefault(require("../Utils/cloudinary-client"));
class FileService {
    static async saveFile(file) {
        console.log(file.path);
        const result = (await this.bufferUpload(file === null || file === void 0 ? void 0 : file.buffer));
        return result.secure_url;
    }
    static async deleteFile(url) {
        await cloudinary_client_1.default.destroy(url.split("/").slice(-1)[0].split(".")[0]);
    }
    static async bufferUpload(buffer) {
        return new Promise((resolve, reject) => {
            const writeStream = cloudinary_client_2.default.upload_stream((err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
            const readStream = new stream_1.Readable({
                read() {
                    this.push(buffer);
                    this.push(null);
                },
            });
            readStream.pipe(writeStream);
        });
    }
}
exports.default = FileService;
