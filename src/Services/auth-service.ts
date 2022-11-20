import bcrypt from "bcrypt";

import { LoginRequestBody, StoreLoginRequestBody } from "../Controllers";
import { VerifyOtpRequestParams, VerifyPhoneNumberRequestParams } from "../Controllers";
import { generateToken, RequestError } from "../Utils";
import { StoreService, UserService } from "./";

export default class AuthService {
  //user auth
  static async userLogin(body: LoginRequestBody) {
    const { phoneNumber, userName, location, pincode } = body;
    const user = await UserService.findUserById(phoneNumber.toString());

    //generates token.
    const token = await generateToken({ userId: phoneNumber });

    //If the user is already there just send that user's details else create a new user.
    if (user) {
      return { token, user };
    } else {
      const newUser = await UserService.createUser({
        _id: phoneNumber.toString(),
        userName,
        location,
        pincode,
      });

      return { token, user: { userName, location, pincode, id: newUser._id } };
    }
  }

  //TODO: need to complete the send otp
  static async sendUserOtp(body: VerifyPhoneNumberRequestParams) {
    const { phoneNumber } = body;
    await timeout(2000);
    return { send: true };
  }

  //TODO: need to complete the verify otp
  static async verifyUserOtp(body: VerifyOtpRequestParams) {
    await timeout(2000);
    return { verified: true };
  }

  //store auth
  static async storeLogin(body: StoreLoginRequestBody) {
    const { email, password } = body;
    const store = await StoreService.getStore({ email });

    if (!store) {
      throw new RequestError(401, "Not Authorized");
    }

    const result = await bcrypt.compare(password, store!.password!);

    if (result) {
      const token = await generateToken({ storeId: store!._id.toString(), email: store.email });

      return { token, store };
    } else {
      throw new RequestError(401, "Not Authorized");
    }
  }
}

//for testing only
function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
