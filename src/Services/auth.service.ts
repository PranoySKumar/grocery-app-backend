import jwt from "jsonwebtoken";
import { authConfig } from "../Data/auth-config";

import User from "../Models/User.model";

export class AuthService {
  static async userLogin(phoneNumber: number) {
    const user = await User.findOne({ _id: phoneNumber });
    const token = jwt.sign({ phoneNumber }, authConfig.jwt_secret, {
      expiresIn: "1m",
    });
    //If the user is already there just send that user's details else create a new user.
    if (user) {
      return { token, user };
    } else {
      const newUser = await new User({ _id: phoneNumber }).save();
      return { token, user: newUser };
    }
  }
}
