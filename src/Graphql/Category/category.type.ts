import { Field, FieldResolver, ID, ObjectType, Root } from "type-graphql";
import { ICategory } from "../../Models";

@ObjectType()
export default class CategoryType {
  @Field((type) => ID)
  id!: string;

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
