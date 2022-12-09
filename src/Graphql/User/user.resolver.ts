import { Query, Resolver } from "type-graphql";
import { UserService } from "../../Services";
import UserType from "./user.type";

@Resolver(UserType)
class UserResolver {
  constructor(private userService: UserService) {}
}
