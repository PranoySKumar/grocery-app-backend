import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { IStore, } from "../../Models";
import { StoreService } from "../../Services";
import { OrderType } from "../Order/order.type";
import { StoreType } from "./store.type";

@Resolver((of) => OrderType)
export class StoreResolver {
	
	@Query(returns => StoreType) async store() {
		return await StoreService.getStore();
	}

	@FieldResolver((type) => String) id(@Root() store: IStore) {
		return store._id!.toString();
	}

}