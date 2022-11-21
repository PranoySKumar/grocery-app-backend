import { Types } from "mongoose";
import { Announcement, IAnnouncements, ICoupon, User } from "../Models";

export default class AnnouncementService {
  //add new coupon.
  static async createAnnouncement(details: IAnnouncements) {
    const { message, title } = details;
    return await new Announcement({ message, title }).save();
  }

  //get all Announcements.
  static async getAllAnnouncement() {
    return await Announcement.find();
  }
}
