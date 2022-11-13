export default class FileService {
  static async saveImage(file: Express.Multer.File) {
    return `${file.originalname} ${file.size}`;
  }
  static async deleteImage(url: string) {
    return Promise.resolve("deleted");
  }
}
