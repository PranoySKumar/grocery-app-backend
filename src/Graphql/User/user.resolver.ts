import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
  Int,
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
import { GraphqlContext } from "../../Utils/graphql-context";
import { CouponType } from "../Coupon/coupon.type";
import { ProductType } from "../Product/product.type";
import UserType, { LocationType, ShippingAddressType } from "./user.type";

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

//UserInputType
@InputType()
class UserInputType {
  @Field((type) => ID, { nullable: true })
  id?: string;

  
  @Field({ nullable: true })
  userName?: string;

  @Field((type) => Int, { nullable: true })
  pincode?: number;

  @Field({ nullable: true })
  profileImageUrl?: string;

  @Field((type) => LocationType, { nullable: true })
  location?: LocationType;

  @Field((type) => [CouponType], { nullable: true })
  coupons?: CouponType[];

  @Field((type) => [String], { nullable: true })
  favourites?: string[];

  @Field((type) => [ShippingAddressType], { nullable: true })
  shippingAddresses?: ShippingAddressType[];
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

  //Query Users
  @Authorized([Role.admin])
  @Query((returns) => [UserType])
  async users() {
    const users = await this.userService.findAllUsers({}, 10, 0, {});
    return users;
  }

  //Query User Details
  @Authorized([Role.admin, Role.user])
  @Query((returns) => UserType)
  async user(@Ctx() context: GraphqlContext, @Arg("id", { nullable: true }) id?: string) {
    let user;
    if (context.tokenData?.userId) {
      // if userid is there in token data use that for finding user.
      user = await this.userService.findUserById(context.tokenData.userId);
    } else {
      //otherwise if id is present as an arg use id for finding user.
      user = await this.userService.findUserById(id!);
    }
    return user;
  }

  //Send Otp
  @Mutation((type) => Boolean)
  async sendUserOtp(@Arg("phoneNumber", (type) => String) phoneNumber: string) {
    return true;
  }

  //Verify Otp
  @Mutation((type) => Boolean)
  async verifyUserOtp(@Arg("code", (type) => Int) code: number) {
    return true;
  }

  //User Login
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

  //Update User
  @Authorized([Role.user, Role.admin])
  @Mutation((type) => Boolean)
  async updateUser(@Arg("id") id: string, @Arg("data") data: UserInputType) {
    await this.userService.updateUserDetails(id, data);
    return true;
  }

  //Delete User
  @Authorized([Role.user, Role.admin])
  @Mutation((type) => Boolean)
  async deleteUser(@Arg("id") id: string) {
    await this.userService.deleteUser(id);
    return true;
  }
}
