import { NextFunction, Request, Response } from "express";
import { AuthTokenData } from "../Middleware";
import { Coupon, ICoupon } from "../Models";
import { UserService } from "../Services";
import CouponService from "../Services/coupon-service";

export default class CouponController {
  //gets all the coupons
  static async getAllCoupons(req: Request, res: Response, next: NextFunction) {
    try {
      const coupons = await CouponService.getAllCoupons();
      res.status(200).json(coupons);
    } catch (error) {
      next(error);
    }
  }

  //gets all coupons inside the coupon list of a user.
  static async getSingleUserCoupons(
    req: Request<{ userId: string }, any, { tokenData: AuthTokenData }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      const { userId: tokenUserId } = req.body.tokenData;

      const coupons = await CouponService.getCouponsByUserId(tokenUserId ?? userId);
      res.status(200).json(coupons);
    } catch (error) {
      next(error);
    }
  }

  //create a coupon from the provided details.
  static async createCoupon(req: Request<any, any, ICoupon>, res: Response, next: NextFunction) {
    try {
      const couponDetails = req.body;
      const newCoupon = await CouponService.createCoupon(couponDetails);
      res.status(200).json(newCoupon);
    } catch (error) {
      next(error);
    }
  }

  //update coupon details.
  static async editCoupon(
    req: Request<{ couponId: string }, any, ICoupon>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { couponId } = req.params;
      const coupons = await CouponService.updateCouponsDetails(couponId, req.body);
      res.status(200).json(coupons);
    } catch (error) {
      next(error);
    }
  }

  //Adds a coupon to the user coupon list.
  static async addCouponToUser(
    req: Request<any, any, { couponId: string; userId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { couponId, userId } = req.body;
      await CouponService.addCouponToUserCouponList(couponId, userId);
      res.status(201).json({ addedCouponToUser: true });
    } catch (error) {
      next(error);
    }
  }

  //add new coupon.
  static async addNewCoupon(
    req: Request<any, any, { couponDetails: ICoupon }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const couponDetails = req.body.couponDetails;
      const coupon = await CouponService.addNewCoupon(couponDetails);
      await CouponService.addCouponForAllUsers(coupon._id.toString());
      res.status(201).json({ addedCouponToUser: true });
    } catch (error) {
      next(error);
    }
  }

  //delete single coupon
  static async deleteCoupon(req: Request<{ couponId: string }>, res: Response, next: NextFunction) {
    try {
      const { couponId } = req.params;
      await CouponService.deleteCoupon(couponId);
      await CouponService.removeCouponForAllUsers(couponId);
      res.status(201).json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }

  //delete single coupon from user coupon list.
  static async removeCouponFromUserCouponList(
    req: Request<any, any, { couponId: string; userId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { couponId, userId } = req.body;
      await CouponService.removeCouponFromUserCouponList(couponId, userId);
      res.status(201).json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }
}
