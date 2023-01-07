import { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import uploader from "../Utils/cloudinary-client";
import cloudinaryClient from "../Utils/cloudinary-client";

export default class FileService {
  static async saveFile(file?: Express.Multer.File) {
    const result = (await this.bufferUpload(file?.buffer!)) as UploadApiResponse;
    return result.secure_url;
  }
  static async deleteFile(url: string) {
    await uploader.destroy(url.split("/").slice(-1)[0].split(".")[0]!);
  }
  private static async bufferUpload(buffer: Buffer) {
    return new Promise((resolve, reject) => {
      const writeStream = cloudinaryClient.upload_stream((err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
      const readStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });
      readStream.pipe(writeStream);
    });
  }
}
