import { Field, InputType } from "type-graphql";
import { IShippingAddress } from "../../Models/User.model";
import { CouponType } from "../Coupon/coupon.type";
import { ShippingAddressType } from "../User/user.type";
import { CartItem } from "./order.type";

@InputType()
export class CartItemInputType {
  @Field()
  productId!: string;

  @Field()
  count!: number;
  @Field((type) => CouponType, { nullable: true })
  coupon!: CouponType;
}

//add new order input type.
@InputType()
export class AddOrderInputType {
  @Field((type) => [CartItemInputType])
  cart!: CartItemInputType[];

  @Field()
  userId!: string;

  @Field({ nullable: true })
  couponId?: string;

  @Field()
  paymentMethod!: string;

  @Field((type) => ShippingAddressType)
  shippingAddress!: IShippingAddress;
}

@InputType()
export class GenerateBillInputType {
  @Field((type) => [CartItemInputType])
  cart!: CartItemInputType[];

  @Field({ nullable: true })
  couponId?: string;
}
