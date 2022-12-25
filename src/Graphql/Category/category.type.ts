import { Field, FieldResolver, ID, InputType, ObjectType, Root } from "type-graphql";
import { ICategory } from "../../Models";

@InputType("CategoryInputType")
@ObjectType()
export default class CategoryType {
  @Field((type) => ID)
  id?: string;

  @Field()
  type?: string;

  @Field()
  name?: string;

  @Field()
  imageUrl?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
