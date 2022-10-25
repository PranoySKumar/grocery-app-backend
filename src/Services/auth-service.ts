import { User } from "../Models";
import { generateToken } from "../Utils";

export default class AuthService {
  static async userLogin(phoneNumber: number) {
    const user = await User.findOne({ _id: phoneNumber });

    //generates token.
    const token = await generateToken({ phoneNumber });

    //If the user is already there just send that user's details else create a new user.
    if (user) {
      return { token, user };
    } else {
      const newUser = await new User({ _id: phoneNumber }).save();
      return { token, user: newUser };
    }
  }
}
