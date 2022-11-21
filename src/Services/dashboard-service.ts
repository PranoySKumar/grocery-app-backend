import bcrypt from "bcrypt";

import { Dashboard, IStore, Store } from "../Models";

export default class DashboardService {
  static async getDashboard(filter?: DashboardService) {
    return await Store.findOne(filter ?? {});
  }

  static async setPassword(password: string, email: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Dashboard.updateOne({ email }, { password: hashedPassword });
  }
}
