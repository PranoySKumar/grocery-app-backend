import { Field, FieldResolver, ID, ObjectType, Root } from "type-graphql";
import { QuantityType } from "../../Data";
import { IProduct } from "../../Models";
import CategoryType from "../Category/category.type";

@ObjectType()
class ProductQuantityType {
  @Field(() => QuantityType)
  type!: QuantityType;

  @Field()
  value!: number;

  @Field()
  totalQuantity?: number;
}

@ObjectType()
export class ProductType {
  @Field((type) => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  price!: number;

  @Field()
  unitsSold!: number;

  @Field({ nullable: true })
  discount?: number;

  @Field((type) => ProductQuantityType)
  quantity!: ProductQuantityType;

  @Field((type) => [CategoryType])
  categories!: CategoryType[];

  @Field()
  imageUrl!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
