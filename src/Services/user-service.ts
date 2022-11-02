import { IUser, User } from "../Models";

export default class UserService {
  static async findOneUser(filter: object, projection?: object) {
    return await User.findOne(filter, projection);
  }
  static async findAllUsers(filter: object, projection?: object) {
    return await User.find(filter, projection);
  }
  static async createUser(data: IUser) {
    return await new User(data).save();
  }
}
