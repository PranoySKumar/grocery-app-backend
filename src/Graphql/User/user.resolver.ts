import {
  Arg,
  Authorized,
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
import { Role } from "../../Utils/auth";
import UserType, { LocationType } from "./user.type";

//UserLoginInputType.
@InputType()
class UserLoginInput implements Partial<UserType> {
  @Field()
  userName!: string;

  @Field((type) => LocationType, { nullable: true })
  location?: LocationType;

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
  constructor(private readonly userService: UserService = new UserService()) {}

  @FieldResolver()
  id(@Root() user: IUser) {
    return user._id!.toString();
  }

  @Authorized([Role.admin])
  @Query((returns) => [UserType])
  async users() {
    const users = await this.userService.findAllUsers({}, 10, 0, {});
    return users;
  }

  @Authorized([Role.admin, Role.user])
  @Query((returns) => UserType)
  async user(@Arg("id") id: string) {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @Authorized([Role.user])
  @Mutation((type) => Boolean)
  async sendUserOtp(@Arg("phoneNumber") phoneNumber: string) {
    return true;
  }

  @Authorized([Role.user])
  @Mutation((type) => Boolean)
  async verifyUserOtp(@Arg("phoneNumber") phoneNumber: string) {
    return true;
  }

  @Authorized([Role.user])
  @Mutation((type) => UserLoginResponse)
  async userLogin(@Arg("data") data: UserLoginInput) {
    const { phoneNumber, userName, location, pincode } = data;

    const user = await this.userService.findUserById(phoneNumber.toString());

    //generates token.
    const token = (await generateToken({ userId: phoneNumber })) as string;

    //If the user is already there just send that user's details else create a new user.
    if (user) {
      return { token, user };
    } else {
      const newUser = await this.userService.createUser({
        _id: phoneNumber.toString(),
        userName,
        location,
        pincode,
      });

      return { token, user: newUser };
    }
  }

  @Authorized(Role.user, Role.admin)
  @Mutation((type) => Boolean)
  async updateUser(@Arg("id") id: string, @Arg("data") data: UserType) {
    this.userService.updateUserDetails(id, data);
    return true;
  }
}
