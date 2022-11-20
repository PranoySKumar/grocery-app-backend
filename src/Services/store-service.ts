import bcrypt from "bcrypt";

import { IStore, Store } from "../Models";

export default class StoreService {
  static async getStore(filter?: IStore) {
    return await Store.findOne(filter ?? {});
  }
  static async setPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Store.updateOne({ name: "grocery" }, { password: hashedPassword });
  }
}
