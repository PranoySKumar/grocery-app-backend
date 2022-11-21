import { RequestHandler, Router } from "express";
import { AccessVerifier, isAuthToken } from "../../Middleware";
import userAnnouncementRoutes from "./user-announcement-routes";

import userAuthRoutes from "./user-auth-routes";
import userCategoryRoutes from "./user-category-routes";
import userCouponRoutes from "./user-coupon-routes";
import userOrderRoutes from "./user-order-routes";
import userProductRoutes from "./user-product-routes";
import userProfileRoutes from "./user-profile-routes";

const userRoutes = Router();

userRoutes.use("/user", userAuthRoutes);
userRoutes.use("/user", isAuthToken, AccessVerifier.isUser, userCategoryRoutes);
userRoutes.use("/user", isAuthToken, AccessVerifier.isUser, userCouponRoutes);
userRoutes.use("/user", isAuthToken, AccessVerifier.isUser, userOrderRoutes);
userRoutes.use("/user", isAuthToken, AccessVerifier.isUser, userProductRoutes);
userRoutes.use("/user", isAuthToken, AccessVerifier.isUser, userProfileRoutes);
userRoutes.use("/user", isAuthToken, AccessVerifier.isUser, userAnnouncementRoutes);

export default userRoutes;
