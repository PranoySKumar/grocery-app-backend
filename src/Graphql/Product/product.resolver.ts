import { ObjectId, Types } from "mongoose";
import { Arg, Authorized, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { FileService } from "../../Services";
import ProductService from "../../Services/product-service";
import { Role } from "../../Utils/auth";
import { ProductQuantityType, ProductType } from "./product.type";

@InputType()
class ProductsQueryInputType {
  @Field({ nullable: true }) discountFilter?: boolean;

  @Field({ nullable: true }) categoryId?: string;

  @Field({ nullable: true }) popularFilter?: boolean;

  @Field({ nullable: true }) searchTerm?: string;

  @Field({ nullable: true }) limit?: number;

  @Field({ nullable: true }) skip?: number;
}

@InputType()
class AddProductInputType {
  @Field() name!: string;
  @Field() price!: number;
  @Field({ nullable: true, defaultValue: 0 }) discount?: number;
  @Field() description!: string;
  @Field() quantity!: ProductQuantityType;
  @Field((type) => [String]) categories?: string[];
  @Field() imageUrl!: string;
  @Field() unitsAvailable!: number;
}
@InputType()
class UpdateProductInputType {
  @Field() id!: string;
  @Field() name!: string;
  @Field() price!: number;
  @Field({ nullable: true, defaultValue: 0 }) discount?: number;
  @Field() description!: string;
  @Field() quantity!: ProductQuantityType;
  @Field((type) => [String]) categories!: string[];
  @Field() imageUrl!: string;
  @Field() unitsAvailable!: number;
}

@Resolver()
export default class ProductResolver {
  @Query((type) => [ProductType])
  async products(@Arg("options") options: ProductsQueryInputType) {
    if (options.searchTerm) return await ProductService.findBySearchTerm(options.searchTerm);
    if (options.discountFilter)
      return await ProductService.findAllDiscountedProducts(options.limit);
    if (options.popularFilter)
      return await ProductService.findAllProducts(options.limit, options.skip, { name: 1 });
    if (options.categoryId)
      return await ProductService.findAllCategoryProducts(options.categoryId, options.limit);
    return await ProductService.findAllProducts(options.limit, options.skip);
  }

  @Query((type) => ProductType)
  async product(@Arg("id") id: string) {
    return await ProductService.findProductById(id);
  }

  //mutations
  @Authorized([Role.admin, Role.store])
  @Mutation((type) => ProductType)
  async addProduct(@Arg("data") data: AddProductInputType) {
    return await ProductService.addNewProduct(data);
  }

  @Authorized([Role.admin, Role.store])
  @Mutation((type) => ProductType)
  async updateProduct(@Arg("data") data: UpdateProductInputType) {
    const { id } = data;
    await ProductService.updateProduct(id, data);
    return await ProductService.findProductById(id);
  }

  @Authorized([Role.admin, Role.store])
  @Mutation((type) => Boolean)
  async deleteProduct(@Arg("id") id: string) {
    try {
      const product = await ProductService.deleteProduct(id);
      FileService.deleteImageFile(product?.imageUrl!);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
