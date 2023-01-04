import { Field, ObjectType } from "type-graphql";
import { OrderStatus } from "../../Data";
import { PaymentMethod } from "../../Data/orders-enum";
import { CouponType } from "../Coupon/coupon.type";
import { ProductType } from "../Product/product.type";
import UserType, { ShippingAddressType } from "../User/user.type";

@ObjectType()
export class OrderType {
  @Field() id!: string;
  @Field() status!: OrderStatus;
  @Field() transactionAmount!: number;
  @Field((type) => UserType) user!: UserType;
  @Field((type) => [CartItem]) cart!: CartItem[];
  @Field() tax!: number;
  @Field() userId!: string;
  @Field() orderNo!: number;
  @Field((type) => CouponType, { nullable: true }) coupon!: CouponType;
  @Field() paymentMethod!: PaymentMethod;
  @Field((type) => Date) createdAt!: Date;
  @Field((type) => ShippingAddressType) shippingAddress!: ShippingAddressType;
  @Field((type) => Date, { nullable: true }) deliveredAt!: Date;
  @Field() shippingCharges!: number;
}

@ObjectType()
export class CartItem {
  @Field((type) => ProductType, { nullable: false }) product!: ProductType;
  @Field() count!: number;
}
