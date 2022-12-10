import { IUser, User } from "../Models";

export default class UserService {
  //find single user by id
  async findUserById(_id: string) {
    return await User.findById(_id).populate("favourites").populate("coupons");
  }

  //find all users.
  async findAllUsers(filter: object, limit: number, skip: number, sort: IUser | any) {
    return await User.find(filter)
      .populate("favourites")
      .populate("coupons")
      .limit(limit)
      .skip(skip)
      .sort(sort);
  }

  //create new user.
  async createUser(data: IUser) {
    return await new User(data).save();
  }

  //delete single user
  async deleteUser(_id: string) {
    return await User.deleteOne({ _id });
  }

  //update  user details
  async updateUserDetails(_id: string, userDetails: IUser | any) {
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
