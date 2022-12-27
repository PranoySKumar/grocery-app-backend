"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Models_1 = require("../Models");
class OrderService {
    static async getSingleUserOrders(userId) {
        return await Models_1.Order.find({ userId })
            .sort({ _id: -1 })
            .populate("userId")
            .populate("cart.productId")
            .populate("couponId");
    }
    static async getAllOrders() {
        return await Models_1.Order.find({})
            .sort({ _id: -1 })
            .populate("userId")
            .populate("cart.productId")
            .populate("couponId");
    }
    //gets single order.
    static async getSingleOrder(id) {
        return await Models_1.Order.findById(id).sort({ _id: -1 }).populate("userId").populate("cart.productId")
            .populate("couponId");
    }
    static async createNewOrder(data) {
        const cart = data.cart.map((item) => ({
            ...item,
            productId: new mongoose_1.Types.ObjectId(item.productId),
        }));
        const store = await Models_1.Store.findOne();
        const shippingCharges = store === null || store === void 0 ? void 0 : store.shippingCharges;
        const userId = data.userId;
        const couponId = data.couponId != undefined ? new mongoose_1.Types.ObjectId(data.couponId) : null;
        const orderNo = await Models_1.Order.find().count();
        await new Models_1.Order({ ...data, cart, userId, couponId, orderNo: orderNo + 1, shippingCharges }).save();
    }
    //creates and calculates order.
    static async calculateBill(cart, couponId) {
        var _a, _b, _c, _d;
        let totalAmount = 0;
        await Promise.all(cart.map(async (item) => {
            const product = await Models_1.Product.findById(item.productId);
            if (product === null || product === void 0 ? void 0 : product.discount) {
                totalAmount =
                    (totalAmount + product.price - product.price * (product.discount / 100)) * item.count;
            }
            else {
                totalAmount = (totalAmount + (product === null || product === void 0 ? void 0 : product.price)) * item.count;
            }
            return true;
        }));
        //Applying Coupon Discount.
        let totalCouponDiscount = 0;
        if (couponId) {
            const coupon = await Models_1.Coupon.findById(couponId);
            totalCouponDiscount = totalAmount * (((_a = coupon === null || coupon === void 0 ? void 0 : coupon.couponDiscount) === null || _a === void 0 ? void 0 : _a.percentage) / 100);
            if (((_b = coupon === null || coupon === void 0 ? void 0 : coupon.couponDiscount) === null || _b === void 0 ? void 0 : _b.upto) && totalCouponDiscount > ((_c = coupon === null || coupon === void 0 ? void 0 : coupon.couponDiscount) === null || _c === void 0 ? void 0 : _c.upto)) {
                totalCouponDiscount = coupon.couponDiscount.upto;
            }
            totalAmount = totalAmount - totalCouponDiscount;
        }
        //calculating Tax.
        const store = await Models_1.Store.findOne();
        totalAmount += store.tax;
        totalAmount += store.shippingCharges;
        const bill = {
            totalAmount: totalAmount,
            tax: (_d = store.tax) !== null && _d !== void 0 ? _d : 0,
            couponDiscount: totalCouponDiscount,
            shippingCharges: store.shippingCharges,
        };
        return bill;
    }
    static async updateOrder(orderId, data) {
        return await Models_1.Order.updateOne({ _id: new mongoose_1.Types.ObjectId(orderId) }, { $set: data }, { runValidators: true, omitUndefined: true });
    }
    static async deleteOrder(orderId) {
        return await Models_1.Order.deleteOne({ _id: new mongoose_1.Types.ObjectId(orderId) });
    }
}
exports.default = OrderService;
