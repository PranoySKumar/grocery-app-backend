import { Types } from "mongoose";
import { Coupon, ICoupon, User } from "../Models";
import UserService from "./user-service";

export default class CouponService {
  //add new coupon.
  static async addNewCoupon(couponDetails: ICoupon) {
    const { couponDiscount, description, title } = couponDetails;
    return await new Coupon({ couponDiscount, description, title }).save();
  }
  //gets all the coupons.
  static async getAllCoupons(filter?: ICoupon, projection?: ICoupon) {
    return await Coupon.find(filter ?? {}, projection);
  }

  //gets all coupons inside the coupon list of a user.
  static async getCouponsByUserId(userId: string, projection?: ICoupon) {
    const user = await User.findById(userId, projection).populate("coupons");
    return user?.coupons;
  }

  //creates coupon.
  static async createCoupon(couponData: ICoupon) {
    return await new Coupon({ ...couponData }).save();
  }

  //updates coupon details.
  static async updateCouponsDetails(couponId: string, couponData: ICoupon) {
    return await Coupon.findByIdAndUpdate(
      couponId,
      { $set: { ...couponData } },
      {
        runValidators: true,
        omitUndefined: true,
      }
    );
  }

  //adds coupon to user coupon list.
  static async addCouponToUserCouponList(couponId: string, userId: string) {
    await User.updateOne({ _id: userId }, { $push: { coupons: new Types.ObjectId(couponId) } });
  }

  //removes a coupon from the user couponlist
  static async removeCouponFromUserCouponList(couponId: string, userId: string) {
    await User.updateOne({ _id: userId }, { $pop: { coupons: new Types.ObjectId(couponId) } });
  }

  //deletes a single coupon.
  static async deleteCoupon(couponId: string) {
    return await Coupon.deleteOne({ _id: new Types.ObjectId(couponId) });
  }

  //add coupon to all users.
  static async addCouponForAllUsers(couponId: string) {
    return await User.updateMany(
      {},
      { $addToSet: { coupons: new Types.ObjectId(couponId) } },
      {
        runValidators: true,
        omitUndefined: true,
      }
    );
  }

  //update  user coupon details.
  static async removeCouponForAllUsers(couponId: string) {
    return await User.updateMany(
      {},
      { $pop: { coupons: new Types.ObjectId(couponId) } },
      {
        runValidators: true,
        omitUndefined: true,
      }
    );
  }
}
