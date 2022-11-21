import { Router } from "express";
import { AuthController } from "../../Controllers";
import AnnouncementController from "../../Controllers/announcement-controller";

const storeAnnouncementRoutes = Router();

storeAnnouncementRoutes.post("/announcements", AnnouncementController.createAnnouncement);
storeAnnouncementRoutes.get("/announcements", AnnouncementController.getAllAnnouncements);

export default storeAnnouncementRoutes;
