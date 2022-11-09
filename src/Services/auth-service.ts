import { LoginRequestBody } from "../Controllers";
import {
  VerifyOtpRequestParams,
  VerifyPhoneNumberRequestParams,
} from "../Controllers/auth-controller";
import { generateToken } from "../Utils";
import { UserService } from "./";

export default class AuthService {
  static async userLogin(body: LoginRequestBody) {
    const { phoneNumber, userName, location, pincode } = body;
    const user = await UserService.findOneUser({ _id: phoneNumber });

    //generates token.
    const token = await generateToken({ phoneNumber });

    //If the user is already there just send that user's details else create a new user.
    if (user) {
      return { token, user };
    } else {
      const newUser = await UserService.createUser({
        _id: phoneNumber,
        userName,
        location,
        pincode,
      });

      return { token, user: { userName, location, pincode, id: newUser._id } };
    }
  }
  static async sendOtp(body: VerifyPhoneNumberRequestParams) {
    const { phoneNumber } = body;
    await timeout(2000);
    return { send: true };
  }
  static async verifyOtp(body: VerifyOtpRequestParams) {
    await timeout(2000);
    return { verified: true };
  }
}

//for testing only
function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
