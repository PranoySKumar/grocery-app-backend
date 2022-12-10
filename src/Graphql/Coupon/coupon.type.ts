import { Field, FieldResolver, ID, ObjectType, Root } from "type-graphql";
import { ICoupon } from "../../Models";

@ObjectType()
class CouponDiscountType {
  @Field()
  upto!: number;

  @Field()
  percentage!: number;
}

@ObjectType()
export class CouponType {
  @Field((type) => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field((type) => CouponDiscountType)
  couponDiscount?: CouponDiscountType;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
