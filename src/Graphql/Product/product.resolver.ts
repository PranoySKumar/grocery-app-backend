import { Arg, Authorized, Field, ID, InputType, Query, Resolver } from "type-graphql";
import ProductService from "../../Services/product-service";
import UserType from "../User/user.type";
import { ProductType } from "./product.type";

@InputType()
class ProductsQueryInputType {
  @Field({ nullable: true })
  discountFilter?: boolean;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  popularFilter?: boolean;

  @Field({ nullable: true })
  searchTerm?: string;

  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  skip?: number;
}

@Resolver()
export default class ProductResolver {
  @Authorized()
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

  @Authorized()
  @Query((type) => ProductType)
  async product(@Arg("id") id: string) {
    return await ProductService.findProductById(id);
  }
}
