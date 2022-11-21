import { NextFunction, Request, Response } from "express";

import AnnouncementService from "../Services/announcement-service";

export default class AnnouncementController {
  //get all announcement
  static async getAllAnnouncements(req: Request, res: Response, next: NextFunction) {
    try {
      const announcements = await AnnouncementService.getAllAnnouncement();
      res.status(201).json(announcements);
    } catch (error) {
      next(error);
    }
  }

  //create announcement
  static async createAnnouncement(
    req: Request<any, any, { message: string; title: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { message, title } = req.body;
      await AnnouncementService.createAnnouncement({ message, title });
      res.status(201).json({ created: true });
    } catch (error) {
      next(error);
    }
  }
}
