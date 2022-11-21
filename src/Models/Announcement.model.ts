import { model, ObjectId, Schema, SchemaTypes } from "mongoose";

export interface IAnnouncements {
  _id?: string | ObjectId;
  title?: string;
  message?: string;
}

const announcementSchema = new Schema<IAnnouncements>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true, capped: { max: 30 } }
);

export const Announcement = model("Announcement", announcementSchema);
