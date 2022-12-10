import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { IUser } from "../../Models";
import { UserService } from "../../Services";
import { generateToken } from "../../Utils";
import UserType from "./user.type";

//UserLoginInputType.
@InputType()
class UserLoginInput implements Partial<UserType> {
  @Field()
  userName!: string;

  @Field({ nullable: true })
  lat?: number;

  @Field({ nullable: true })
  lng?: number;

  @Field({ nullable: true })
  pincode?: number;

  @Field()
  phoneNumber!: string;
}
@ObjectType()
class UserLoginResponse {
  @Field()
  token!: string;

  @Field((type) => UserType)
  user!: UserType;
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

  @Mutation((type) => Boolean)
  async sendUserOtp(@Arg("phoneNumber") phoneNumber: string) {
    return true;
  }

  @Mutation((type) => Boolean)
  async verifyUserOtp(@Arg("phoneNumber") phoneNumber: string) {
    return true;
  }
  @Mutation((type) => UserLoginResponse)
  async userLogin(@Arg("data") data: UserLoginInput) {
    const { phoneNumber, userName, lat, lng, pincode } = data;

    const user = await this.userService.findUserById(phoneNumber.toString());

    //generates token.
    const token = (await generateToken({ userId: phoneNumber })) as string;

    //If the user is already there just send that user's details else create a new user.
    if (user) {
      const { userName, location, pincode, _id } = user;
      return { token, user };
    } else {
      let location;
      if (lat != null && lng != null) location = { lat, lng };
      const newUser = await this.userService.createUser({
        _id: phoneNumber.toString(),
        userName,
        location,
        pincode,
      });

      return { token, user: newUser };
    }
  }
}
