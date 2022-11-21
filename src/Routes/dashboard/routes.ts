import { Router } from "express";
import { AccessVerifier } from "../../Middleware";
import dashboardAnnouncementRoutes from "./dashboard-announcement-routes";
import dashboardAuthRoutes from "./dashboard-auth-routes";
import dashboardCategoryRoutes from "./dashboard-category-routes";
import dashboardCouponRoutes from "./dashboard-coupon-routes";
import dashboardOrderRoutes from "./dashboard-order-routes";
import dashboardProductRoutes from "./dashboard-product-routes";
import dashboardProfileRoutes from "./dashboard-profile-routes";

const dashboardRoutes = Router();

dashboardRoutes.use("/store", AccessVerifier.isDashboard, dashboardAuthRoutes);
dashboardRoutes.use("/store", AccessVerifier.isDashboard, dashboardProductRoutes);
dashboardRoutes.use("/store", AccessVerifier.isDashboard, dashboardCategoryRoutes);
dashboardRoutes.use("/store", AccessVerifier.isDashboard, dashboardOrderRoutes);
dashboardRoutes.use("/store", AccessVerifier.isDashboard, dashboardCouponRoutes);
dashboardRoutes.use("/store", AccessVerifier.isDashboard, dashboardProfileRoutes);
dashboardRoutes.use("/store", AccessVerifier.isDashboard, dashboardAnnouncementRoutes);

export default dashboardRoutes;
