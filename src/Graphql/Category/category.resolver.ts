import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CategoryService, FileService } from "../../Services";
import { Role } from "../../Utils/auth";
import uploader from "../../Utils/cloudinary-client";
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
  async addCategory(@Arg("name") name: string, @Arg("image") image: string) {
    try {
      const res = await uploader.upload(image, {});
      return await CategoryService.addCategory(name, "meat", res.secure_url);
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
    @Arg("image", { nullable: true }) image?: string
  ) {
    try {
      if (image) {
        const response = await uploader.upload(image, {});

        const category = await CategoryService.updateCategory(id, {
          name,
          imageUrl: response.secure_url,
        });
        await uploader.destroy(category?.imageUrl.split("/").slice(-1)[0].split(".")[0]!);
      } else {
        await CategoryService.updateCategory(id, { name });
      }
      return CategoryService.getSingleCategory(id);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
