import { Arg, Authorized, ID, Query, Resolver } from "type-graphql";
import { CategoryService } from "../../Services";
import CategoryType from "./category.type";

@Resolver()
export default class CategoryResolver {
 
  @Query((type) => [CategoryType])
  async categories(@Arg("limit", { nullable: true }) limit?: number) {
    return await CategoryService.getAll(limit);
  }

  
  @Query((type) => CategoryType)
  async category(@Arg("id") id: string) {
    return await CategoryService.getOne(id);
  }
}
