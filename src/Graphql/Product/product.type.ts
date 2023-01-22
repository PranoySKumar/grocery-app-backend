import { Authorized, Field, ID, InputType, ObjectType } from "type-graphql";
import { QuantityType } from "../../Data";
import { Role } from "../../Utils/auth";
import CategoryType from "../Category/category.type";

@InputType("ProductQuantityInputType")
@ObjectType()
export class ProductQuantityType {
  @Field(() => QuantityType) type!: QuantityType;
  @Field() value!: number;
}

@InputType("ProductInputType")
@ObjectType()
export class ProductType {
  @Field((type) => ID) id?: string;
  @Field() name?: string;
  @Field() description?: string;
  @Field() price?: number;
  @Authorized([Role.admin, Role.store]) @Field() unitsSold?: number;
  @Field({ nullable: true }) discount?: number;
  @Field((type) => ProductQuantityType) quantity!: ProductQuantityType;
  @Field((type) => [CategoryType]) categories?: CategoryType[];
  @Field() imageUrl?: string;
  @Field() isAvailable!: boolean;
  @Authorized([Role.admin, Role.store]) @Field() unitsAvailable!: number;
  @Field() createdAt?: Date;
  @Field() updatedAt?: Date;
}
