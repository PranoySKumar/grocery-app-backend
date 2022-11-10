export default class FileService {
  static async saveImage(file: Express.Multer.File) {
    return `${file.filename} ${file.size}`;
  }
}
