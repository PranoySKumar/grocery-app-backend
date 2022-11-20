import { Router } from "express";
import { AccessVerifier } from "../../Middleware";
import storeAuthRoutes from "./store-auth-routes";
import storeCategoryRoutes from "./store-category-routes";
import storeCouponRoutes from "./store-coupon-routes";
import storeOrderRoutes from "./store-order-routes";
import storeProductRoutes from "./store-product-routes";
import storeProfileRoutes from "./store-profile-routes";

const storeRoutes = Router();

storeRoutes.use("/store", AccessVerifier.isStore, storeAuthRoutes);
storeRoutes.use("/store", AccessVerifier.isStore, storeProductRoutes);
storeRoutes.use("/store", AccessVerifier.isStore, storeCategoryRoutes);
storeRoutes.use("/store", AccessVerifier.isStore, storeOrderRoutes);
storeRoutes.use("/store", AccessVerifier.isStore, storeCouponRoutes);
storeRoutes.use("/store", AccessVerifier.isStore, storeProfileRoutes);

export default storeRoutes;
