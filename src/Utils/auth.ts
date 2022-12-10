import { AuthChecker } from "type-graphql";
import { AuthTokenData } from "../Middleware";

export enum Role {
  admin,
  user,
  store,
}

export const customAuthChecker: AuthChecker<{ tokenData: AuthTokenData }, Role> = (
  { root, args, context, info },
  roles
) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  if (!context.tokenData) return false;
  if (roles.length > 0) {
    roles.forEach((value) => {
      switch (value) {
        case Role.admin:
          if (context.tokenData.AdminId) return true;
          else break;
        case Role.user:
          if (context.tokenData.userId) return true;
          else break;
        case Role.store:
          if (context.tokenData.storeId) return true;
          else break;
        default:
          return false;
      }
    });
  }

  return true; // or false if access is denied
};
