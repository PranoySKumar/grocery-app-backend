import { Field, FieldResolver, ID, ObjectType, Root } from "type-graphql";
import { ICategory } from "../../Models";

@ObjectType()
export default class CategoryType {
  @Field((type) => ID)
  @FieldResolver()
  id(@Root() category: ICategory) {
    return category._id!.toString();
  }

  @Field()
  type!: string;

  @Field()
  name!: string;

  @Field()
  imageUrl!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
