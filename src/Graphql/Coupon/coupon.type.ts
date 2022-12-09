import { Field, FieldResolver, ID, ObjectType, Root } from "type-graphql";
import { ICoupon } from "../../Models";

@ObjectType()
export class CouponType {
  @Field((type) => ID)
  @FieldResolver()
  id(@Root() coupon: ICoupon) {
    return coupon._id!.toString();
  }

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field((type) => ({ upTo: String, percentage: Number }))
  couponDiscount?: { upto: number; percentage: number };

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
