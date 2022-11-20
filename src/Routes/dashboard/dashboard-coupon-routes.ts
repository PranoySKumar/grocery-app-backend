import { Router } from "express";
import { CouponController } from "../../Controllers";

const dashboardCouponRoutes = Router();

//store
dashboardCouponRoutes.get("/coupons", CouponController.getAllCoupons);
dashboardCouponRoutes.delete("/coupons/:couponId", CouponController.deleteCoupon);
dashboardCouponRoutes.patch("/coupons", CouponController.editCoupon);
dashboardCouponRoutes.put("/coupons", CouponController.addNewCoupon);

export default dashboardCouponRoutes;
