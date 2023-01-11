import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CategoryService, FileService } from "../../Services";
import { Role } from "../../Utils/auth";
import CategoryType from "./category.type";

@Resolver()
export default class CategoryResolver {
  @Query((type) => [CategoryType])
  async categories(@Arg("limit", { nullable: true }) limit?: number) {
    return await CategoryService.getAllCategories(limit);
  }

  @Query((type) => CategoryType)
  async category(@Arg("id") id: string) {
    return await CategoryService.getSingleCategory(id);
  }

  @Authorized([Role.admin, Role.store])
  @Mutation((type) => CategoryType)
  async addCategory(@Arg("name") name: string, @Arg("imageUrl") imageUrl: string) {
    try {
      return await CategoryService.addCategory(name, "Meat", imageUrl);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Authorized([Role.admin, Role.store])
  @Mutation((type) => CategoryType)
  async updateCategory(
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("imageUrl", { nullable: true }) imageUrl?: string
  ) {
    try {
      const category = await CategoryService.updateCategory(id, {
        name,
        imageUrl,
      });
      if (imageUrl) await FileService.deleteFile(category?.imageUrl!);

      return await CategoryService.getSingleCategory(id);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
