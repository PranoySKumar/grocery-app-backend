import { Field, FieldResolver, ID, InputType, ObjectType, Root } from "type-graphql";
import { ICoupon } from "../../Models";

@InputType("CouponDiscountInputType")
@ObjectType()
class CouponDiscountType {
  @Field()
  upto!: number;

  @Field()
  percentage!: number;
}

@InputType("CouponInputType")
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
