import { User } from "../Models";
import { generateToken } from "../Utils";
import { UserService } from "./";

export default class AuthService {
  static async userLogin(phoneNumber: number) {
    const user = await UserService.findOneUser({ _id: phoneNumber });

    //generates token.
    const token = await generateToken({ phoneNumber });

    //If the user is already there just send that user's details else create a new user.
    if (user) {
      return { token, user };
    } else {
      const newUser = UserService.createUser({ _id: phoneNumber });
      return { token, user: newUser };
    }
  }
}
