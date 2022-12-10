import { Arg, ID, Query, Resolver } from "type-graphql";
import ProductService from "../../Services/product-service";
import UserType from "../User/user.type";
import { ProductType } from "./product.type";

@Resolver()
class ProductResolver {
  @Query((type) => [ProductType])
  async products(
    @Arg("discountFilter") discountFilter?: true,
    @Arg("categoryId") categoryId?: string,
    @Arg("searchTerm") searchTerm?: string,
    @Arg("limit") limit?: number,
    @Arg("skip") skip?: number
  ) {
    if (searchTerm) return await ProductService.findBySearchTerm(searchTerm);
    if (discountFilter) return await ProductService.findAllDiscountedProducts(limit);
    if (categoryId) return await ProductService.findAllCategoryProducts(categoryId, limit);
    return await ProductService.findAllProducts(limit, skip);
  }

  @Query((type) => ProductType)
  async product(@Arg("id") id: string) {
    return await ProductService.findProductById(id);
  }
}
