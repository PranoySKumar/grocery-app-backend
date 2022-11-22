import { Router } from "express";
import AnnouncementController from "../../Controllers/announcement-controller";

const userAnnouncementRoutes = Router();

userAnnouncementRoutes.get("/announcements", AnnouncementController.getAllAnnouncements);

export default userAnnouncementRoutes;
