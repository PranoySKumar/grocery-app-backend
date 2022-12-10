import { disconnect, ObjectId } from "mongoose";
import { Field, FieldResolver, ID, ObjectType, Root } from "type-graphql";
import { QuantityType } from "../../Data";
import { ICategory, IProduct } from "../../Models";
import CategoryType from "../Category/category.type";

@ObjectType()
export class ProductType {
  @Field((type) => ID)
  @FieldResolver()
  id(@Root() product: IProduct) {
    return product._id!.toString();
  }

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

  @Field((type) => ({
    type: QuantityType,
    value: Number,
    totalQuantity: Number,
  }))
  quantity!: { type: QuantityType; value: number; totalQuantity: number };

  @Field((type) => [CategoryType])
  categories!: CategoryType[];

  @Field()
  imageUrl!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
