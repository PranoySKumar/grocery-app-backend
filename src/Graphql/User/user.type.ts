import { ObjectType, Field, ID, Int, FieldResolver, Root } from "type-graphql";
import { IUser } from "../../Models";
import { CouponType } from "../Coupon/coupon.type";

@ObjectType()
export default class UserType {
  @Field((type) => ID)
  @FieldResolver()
  id(@Root() user: IUser) {
    return user._id!.toString();
  }

  @Field()
  userName!: string;

  @Field((type) => Int, { nullable: true })
  pincode?: number;

  @Field({ nullable: true })
  profileImageUrl?: string;

  @Field((type) => ({ lat: Number, lng: Number }), { nullable: true })
  location?: { lat: number; lng: number };

  @Field((type) => [CouponType], { defaultValue: [] })
  coupons!: CouponType[];

  @Field({ defaultValue: [] })
  favourites!: [];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
