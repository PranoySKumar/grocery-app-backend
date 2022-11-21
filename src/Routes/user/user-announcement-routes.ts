import { Router } from "express";
import { AuthController } from "../../Controllers";
import AnnouncementController from "../../Controllers/announcement-controller";

const userAnnouncementRoutes = Router();

userAnnouncementRoutes.get("/announcements", AnnouncementController.getAllAnnouncements);

export default userAnnouncementRoutes;
