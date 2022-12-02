import { IUser, User } from "../Models";

export default class UserService {
  //find single user by id
  static async findUserById(_id: string, projection?: object) {
    return await User.findOne({ _id }, projection);
  }

  //find all users.
  static async findAllUsers(filter?: object, projection?: object) {
    return await User.find(filter ?? {}, projection);
  }

  //create new user.
  static async createUser(data: IUser) {
    return await new User(data).save();
  }

  //delete single user
  static async deleteUser(_id: string) {
    return await User.deleteOne({ _id });
  }

  //update  user details
  static async updateUserDetails(_id: string, userDetails: IUser) {
    return await User.updateOne(
      { _id },
      { $set: userDetails },
      {
        runValidators: true,
        omitUndefined: true,
      }
    );
  }
}
