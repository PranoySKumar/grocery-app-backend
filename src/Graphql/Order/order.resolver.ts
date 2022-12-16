import { Arg, Authorized, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { IOrder } from "../../Models";
import { OrderService } from "../../Services";
import { Role } from "../../Utils/auth";
import { CouponType } from "../Coupon/coupon.type";
import UserType from "../User/user.type";
import { CartItem, OrderType } from "./order.type";

@Resolver(OrderType)
export class OrderResolver {
  @Authorized([Role.admin])
  @Query((returns) => [OrderType])
  async orders() {
    return OrderService.getAllOrders();
  }

  @Authorized([Role.user])
  @Query((returns) => [OrderType])
  async userOrders(@Arg("userId") userId: string) {
    return OrderService.getSingleUserOrders(userId);
  }

  @FieldResolver((type) => UserType)
  user(@Root() order: IOrder) {
    return order.userId;
  }

  @FieldResolver((type) => CouponType, { nullable: true })
  coupon(@Root() order: IOrder) {
    return order.couponId;
  }

  @FieldResolver((type) => String)
  id(@Root() order: IOrder) {
    return order._id!.toString();
  }

  @FieldResolver((type) => [CartItem])
  cart(@Root() order: IOrder) {
    return order.cart.map((item: any) => {
      const newProd = {
        ...item._doc,
        product: item.productId,
      };
      delete newProd.productId;
      return newProd;
    });
  }
}
