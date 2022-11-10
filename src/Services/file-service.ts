export default class FileService {
  static saveImage(file: Express.Multer.File) {
    return `${file.filename} ${file.size}`;
  }
}
