import { Router } from "express";
import { AccessVerifier } from "../../Middleware";
import dashboardAuthRoutes from "./dashboard-auth-routes";
import dashboardCategoryRoutes from "./dashboard-category-routes";
import dashboardCouponRoutes from "./dashboard-coupon-routes";
import dashboardOrderRoutes from "./dashboard-order-routes";
import dashboardProductRoutes from "./dashboard-product-routes";
import dashboardProfileRoutes from "./dashboard-profile-routes";

const dashboardRoutes = Router();

dashboardRoutes.use("/store", AccessVerifier.isStore, dashboardAuthRoutes);
dashboardRoutes.use("/store", AccessVerifier.isStore, dashboardProductRoutes);
dashboardRoutes.use("/store", AccessVerifier.isStore, dashboardCategoryRoutes);
dashboardRoutes.use("/store", AccessVerifier.isStore, dashboardOrderRoutes);
dashboardRoutes.use("/store", AccessVerifier.isStore, dashboardCouponRoutes);
dashboardRoutes.use("/store", AccessVerifier.isStore, dashboardProfileRoutes);

export default dashboardRoutes;
