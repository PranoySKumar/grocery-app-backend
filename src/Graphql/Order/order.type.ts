import { Field, ObjectType } from "type-graphql";
import { OrderStatus } from "../../Data";
import { CouponType } from "../Coupon/coupon.type";
import { ProductType } from "../Product/product.type";
import UserType from "../User/user.type";

@ObjectType()
export class OrderType {
  @Field()
  id!: string;

  @Field()
  status!: OrderStatus;

  @Field()
  transactionAmount!: number;

  @Field((type) => UserType)
  user!: UserType;

  @Field((type) => [CartItem])
  cart!: CartItem[];

  @Field()
  tax!: number;

  @Field((type) => CouponType, { nullable: true })
  coupon!: CouponType;
}

@ObjectType()
export class CartItem {
  @Field((type) => ProductType, { nullable: false })
  product!: ProductType;

  @Field()
  count!: number;
}