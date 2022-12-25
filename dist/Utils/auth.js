"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAuthChecker = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["admin"] = 0] = "admin";
    Role[Role["user"] = 1] = "user";
    Role[Role["store"] = 2] = "store";
})(Role = exports.Role || (exports.Role = {}));
const customAuthChecker = ({ root, args, context, info }, roles) => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    if (!context.tokenData)
        return false;
    if (roles.length > 0) {
        roles.forEach((value) => {
            switch (value) {
                case Role.admin:
                    if (context.tokenData.AdminId)
                        return true;
                    else
                        break;
                case Role.user:
                    if (context.tokenData.userId)
                        return true;
                    else
                        break;
                case Role.store:
                    if (context.tokenData.storeId)
                        return true;
                    else
                        break;
                default:
                    return false;
            }
        });
    }
    return true; // or false if access is denied
};
exports.customAuthChecker = customAuthChecker;
