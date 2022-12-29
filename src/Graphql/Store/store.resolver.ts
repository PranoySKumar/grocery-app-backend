import {
  Arg,
  Authorized,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { IStore } from "../../Models";
import { StoreService } from "../../Services";
import { OrderType } from "../Order/order.type";
import { StoreType } from "./store.type";

@Resolver((of) => OrderType)
export class StoreResolver {
  @Query((returns) => StoreType) async store() {
    return await StoreService.getStore();
  }

  @Mutation((returns) => String, { nullable: true }) async storeLogin(
    @Arg("password") password: string
  ) {
    const token = (await StoreService.checkAuth(password)) as null | string;
    if (token == null) {
      return null;
    } else {
      return token;
    }
  }

  @FieldResolver((type) => String) id(@Root() store: IStore) {
    return store._id!.toString();
  }
}
