import { isNullableType } from "graphql";
import { ObjectId, Types } from "mongoose";
import { Arg, Authorized, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { QuantityType } from "../../Data";
import ProductService from "../../Services/product-service";
import { Role } from "../../Utils/auth";
import { ProductType } from "./product.type";

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
  @Field() quantity!: number;
  @Field() quantityType!: QuantityType;
  @Field() categoryId!: string;
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
    const {
      categoryId,
      description,
      discount,
      imageUrl,
      name,
      price,
      quantity,
      quantityType,
      unitsAvailable,
    } = data;
    return await ProductService.addNewProduct({
      name,
      description,
      discount,
      price,
      imageUrl,
      unitsAvailable,

      quantity: { type: quantityType, value: quantity },
      categories: [new Types.ObjectId(categoryId)] as Types.ObjectId[],
    });
  }
}
