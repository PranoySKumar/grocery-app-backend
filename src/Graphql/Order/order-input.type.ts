import { Field, InputType } from "type-graphql";
import { CouponType } from "../Coupon/coupon.type";
import { CartItem } from "./order.type";

@InputType()
export class CartItemInputType {
  @Field()
  productId!: string;

  @Field()
  count!: number;
}

//add new order input type.
@InputType()
export class AddOrderInputType {
  @Field((type) => [CartItemInputType])
  cart!: CartItemInputType[];

  @Field()
  userId!: string;

  @Field({ nullable: true })
  couponId!: string;
}

@InputType()
export class GenerateBillInputType {
  @Field((type) => [CartItemInputType])
  cart!: CartItemInputType[];

  @Field({ nullable: true })
  couponId?: string;
}
