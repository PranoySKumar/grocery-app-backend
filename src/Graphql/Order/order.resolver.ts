import {
  Arg,
  Authorized,
  Field,
  FieldResolver,
  Float, Mutation,
  ObjectType, Query,
  Resolver,
  Root
} from "type-graphql";
import { OrderStatus } from "../../Data";
import { PaymentMethod } from "../../Data/orders-enum";
import { IOrder } from "../../Models";
import { OrderService } from "../../Services";
import { Role } from "../../Utils/auth";
import { CouponType } from "../Coupon/coupon.type";
import UserType from "../User/user.type";
import { AddOrderInputType, CartItemInputType, GenerateBillInputType } from "./order-input.type";
import { CartItem, OrderType } from "./order.type";

@Resolver(OrderType) 
export class OrderResolver {
  @Authorized([Role.admin]) @Query((returns) => [OrderType])
  async orders() {
    return OrderService.getAllOrders();
  }

  @Authorized() @Query((returns) => OrderType)
  async order(@Arg("id") id: string) {
    return OrderService.getSingleOrder(id);
  }

  @Authorized([Role.user]) @Query((returns) => [OrderType])
  async userOrders(@Arg("userId") userId: string) {
    return OrderService.getSingleUserOrders(userId);
  }


  @Authorized([Role.user, Role.admin]) @Mutation((returns) => Boolean)
  async addOrder(@Arg("cartData") cartData: AddOrderInputType) {
    const { cart, couponId, userId, shippingAddress, paymentMethod } = cartData;

    await OrderService.createNewOrder({
      cart,
      
      couponId,
      userId,
      shippingAddress,
      status: OrderStatus.placed,
      paymentMethod: <PaymentMethod>paymentMethod,
    });
    return true;
  }

  @Mutation((returns) => GenerateBillQueryType) 
  async generateBill(@Arg("cartData") cartData : GenerateBillInputType) {
    const { cart, couponId } = cartData;

    const bill = await OrderService.calculateBill(cart, couponId);
    return bill 
  }

  @Authorized([Role.user, Role.admin]) @Query((returns) => [ProductAvailabilityResultType]) 
  async checkProductAvailability(@Arg("cartData", type => [CartItemInputType]) cartData: CartItemInputType[]) {
    const cart = cartData;
    return await OrderService.checkItemsAvailability(cart);
  }


  @FieldResolver((type) => UserType) user(@Root() order: IOrder) {
    return order.userId;
  }

  @FieldResolver((type) => CouponType, { nullable: true }) coupon(@Root() order: IOrder) {
    return order.couponId;
  }
  
  @FieldResolver((type) => String) id(@Root() order: IOrder) {
    return order._id!.toString();
  }

  @FieldResolver((type) => [CartItem]) cart(@Root() order: IOrder) {
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
class ProductAvailabilityResultType {
  @Field() productId!: string;
  @Field({ nullable: true }) unitsAvailable?: number;
  @Field({ nullable: true }) isAvailable?: boolean;
}

@ObjectType()
class GenerateBillQueryType {
  @Field() totalAmount!: number;
  @Field((type) => Float) tax!: number;
  @Field((type) => Float) couponDiscount!: number;
  @Field((type) => Float) shippingCharges!: number;
}


