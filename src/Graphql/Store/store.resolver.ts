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
import { OrderType } from "../Order/order.type";
import { StoreType } from "./store.type";

@InputType()
class UpdateStoreInputType {
  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) email?: string;
  @Field({ nullable: true }) phoneNumber?: number;
  @Field({ nullable: true }) tax?: number;
  @Field({ nullable: true }) deviceId?: string;
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
    @Arg("deviceId") deviceId: string
  ) {
    const token = (await StoreService.checkAuth(password)) as null | string;
    if (token == null) {
      return null;
    } else {
      await Store.updateOne({}, { $set: { deviceId } });
      return token;
    }
  }

  @Mutation((returns) => Boolean) async updateStore(data: UpdateStoreInputType) {
    await StoreService.updateStore(data);
  }

  @FieldResolver((type) => String) id(@Root() store: IStore) {
    return store._id!.toString();
  }
}
