import {
  Arg,
  Authorized,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { IStore, Store } from "../../Models";
import { StoreService } from "../../Services";
import { StoreType } from "./store.type";

@InputType()
class UpdateStoreInputType {
  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) email?: string;
  @Field({ nullable: true }) phoneNumber?: number;
  @Field({ nullable: true }) tax?: number;
  @Field({ nullable: true }) shippingCharges?: number;
  @Field({ nullable: true }) deliveryTime?: string;
}

@Resolver((of) => StoreType)
export class StoreResolver {
  @Authorized() @Query((returns) => StoreType) async store() {
    return await StoreService.getStore();
  }

  @Mutation((returns) => String, { nullable: true }) async storeLogin(
    @Arg("password") password: string,
  ) {
    const token = (await StoreService.checkAuth(password)) as null | string;
    if (token == null) {
      return null;
    } else {
      return token;
    }
  }

  @Mutation((returns) => Boolean) async updateStore(@Arg("data") data: UpdateStoreInputType) {
    try {
      await StoreService.updateStore(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @FieldResolver((type) => String) id(@Root() store: IStore) {
    return store._id!.toString();
  }
}
