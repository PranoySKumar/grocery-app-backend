import { IUser, User } from "../Models";

export default class UserService {
  static async findOneUser(filter: object) {
    return await User.findOne(filter);
  }
  static async findAllUsers(filter: object) {
    return await User.find(filter);
  }
  static async createUser(data: IUser) {
    return await new User(data).save();
  }
}
