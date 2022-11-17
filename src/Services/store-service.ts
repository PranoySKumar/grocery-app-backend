import bcrypt from "bcrypt";

import { Store } from "../Models";

export default class StoreService {
  static async getStore(filter: object) {
    return await Store.findOne(filter);
  }
  static async setPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Store.updateOne({ name: "grocery" }, { password: hashedPassword });
  }
}
