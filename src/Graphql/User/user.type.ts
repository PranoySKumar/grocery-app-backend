import { ObjectType, Field, ID, Int, FieldResolver, Root, InputType } from "type-graphql";
import { AddressType } from "../../Data";
import { CouponType } from "../Coupon/coupon.type";
import { ProductType } from "../Product/product.type";

@InputType("ShippingAddressInputType")
@ObjectType()
export class ShippingAddressType {
  @Field()
  recipientName!: string;

  @Field()
  address!: string;

  @Field()
  pincode!: number;

  @Field({ nullable: true })
  landmark?: string;

  @Field((type) => AddressType, { nullable: true })
  type?: AddressType;
}

@InputType("LocationInputType")
@ObjectType()
export class LocationType {
  @Field()
  lat!: number;

  @Field()
  lng!: number;
}

@InputType("UserInputType")
@ObjectType()
export default class UserType {
  @Field((type) => ID)
  id!: string;

  @Field() userName!: string;

  @Field((type) => Int, { nullable: true })
  pincode?: number;

  @Field({ nullable: true })
  profileImageUrl?: string;

  @Field((type) => LocationType, { nullable: true })
  location?: LocationType;

  @Field((type) => [CouponType], { defaultValue: [] })
  coupons!: CouponType[];

  @Field((type) => [ProductType], { defaultValue: [] })
  favourites!: ProductType[];

  @Field((type) => [ShippingAddressType], { defaultValue: [] })
  shippingAddresses!: ShippingAddressType[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
