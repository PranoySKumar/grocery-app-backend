import { Router } from "express";
import { CouponController } from "../../Controllers";

const storeCouponRoutes = Router();

//store
storeCouponRoutes.get("/coupons", CouponController.getAllCoupons);
storeCouponRoutes.delete("/coupons/:couponId", CouponController.deleteCoupon);
storeCouponRoutes.patch("/coupons", CouponController.editCoupon);
storeCouponRoutes.put("/coupons", CouponController.addNewCoupon);

export default storeCouponRoutes;
