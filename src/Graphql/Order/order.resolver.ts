import {
  Arg,
  Authorized,
  Field,
  FieldResolver,
  Float,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { OrderStatus } from "../../Data";
import { IOrder } from "../../Models";
import { OrderService } from "../../Services";
import { Role } from "../../Utils/auth";
import { CouponType } from "../Coupon/coupon.type";
import UserType from "../User/user.type";
import { AddOrderInputType, GenerateBillInputType } from "./order-input.type";
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

  @Authorized([Role.user, Role.admin])
  @Mutation((returns) => Boolean)
  async addOrder(@Arg("cartData") cartData: AddOrderInputType) {
    const { cart, couponId, userId } = cartData;
    const data = await OrderService.calculateBill(cart, couponId);
    await OrderService.createNewOrder({
      cart,
      tax: data.tax,
      couponId,
      transactionAmount: data.totalAmount,
      userId,
      status: OrderStatus.placed,
    });
    return true;
  }

  @Mutation((returns) => GenerateBillQueryType)
  async generateBill(@Arg("cartData") cartData: GenerateBillInputType) {
    const { cart, couponId } = cartData;
    return await OrderService.calculateBill(cart, couponId);
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

@ObjectType()
class GenerateBillQueryType {
  @Field()
  totalAmount!: number;

  @Field((type) => Float)
  tax!: number;

  @Field((type) => Float)
  couponDiscount!: number;

  @Field((type) => Float)
  deliveryPartnerFee!: number;
}
