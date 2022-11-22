import { Router } from "express";
import AnnouncementController from "../../Controllers/announcement-controller";

const dashboardAnnouncementRoutes = Router();

dashboardAnnouncementRoutes.post("/announcements", AnnouncementController.createAnnouncement);
dashboardAnnouncementRoutes.get("/announcements", AnnouncementController.getAllAnnouncements);

export default dashboardAnnouncementRoutes;
