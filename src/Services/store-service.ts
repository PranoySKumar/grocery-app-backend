import bcrypt from "bcrypt";

import { IStore, Store } from "../Models";
import { generateToken } from "../Utils";

export default class StoreService {
  static async getStore(filter?: IStore) {
    return await Store.findOne(filter ?? {});
  }
  static async setPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Store.updateOne({ name: "grocery" }, { password: hashedPassword });
  }

  static async checkAuth(password: string) {
    const store = await this.getStore();
    const result = await bcrypt.compare(password, store?.password!);
    if (!result) {
      return null;
    }

    return await generateToken({ storeId: store?._id });
  }

  static async updateStore(store: IStore & any) {
    await Store.updateOne({}, { $set: store });
  }
}
