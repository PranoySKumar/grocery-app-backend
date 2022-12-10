import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { IUser } from "../../Models";
import { UserService } from "../../Services";
import { generateToken } from "../../Utils";
import UserType, { LocationType } from "./user.type";

//UserLoginInputType.
@InputType()
class UserLoginInputType implements Partial<UserType> {
  @Field()
  userName!: string;

  @Field()
  location?: LocationType;

  @Field()
  pincode?: number;

  @Field()
  phoneNumber!: string;
}

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UserService = new UserService()) {}

  @FieldResolver()
  id(@Root() user: IUser) {
    return user._id!.toString();
  }

  @Query((returns) => [UserType])
  async users() {
    const users = await this.userService.findAllUsers({}, 10, 0, {});
    return users;
  }
  @Query((returns) => UserType)
  async user(@Arg("id") id: string) {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @Mutation()
  async sendUserOtp(@Arg("phoneNumber") phoneNumber: string) {
    return true;
  }

  @Mutation()
  async verifyUserOtp(@Arg("phoneNumber") phoneNumber: string) {
    return true;
  }
  @Mutation()
  async userLogin(@Arg("data") loginInputData: UserLoginInputType) {
    const { phoneNumber, userName, location, pincode } = loginInputData;

    const user = await this.userService.findUserById(phoneNumber.toString());

    //generates token.
    const token = await generateToken({ userId: phoneNumber });

    //If the user is already there just send that user's details else create a new user.
    if (user) {
      const { userName, location, pincode, _id } = user;
      return { token, user: { userName, location, pincode, _id } };
    } else {
      const newUser = await this.userService.createUser({
        _id: phoneNumber.toString(),
        userName,
        location,
        pincode,
      });

      return { token, user: { userName, location, pincode, _id: newUser._id } };
    }
  }
}
