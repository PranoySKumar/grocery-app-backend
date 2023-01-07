import { NextFunction, Request, Response } from "express";
import { print } from "graphql";
import { FileService } from "../Services";
import cloudinaryClient from "../Utils/cloudinary-client";

export class FileController {
  static async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      const url = await FileService.saveFile(file);
      res.json({ url });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
