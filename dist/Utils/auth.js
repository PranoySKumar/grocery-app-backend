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
    if (!context.tokenData || (!context.tokenData.userId && !context.tokenData.AdminId && !context.tokenData.storeId))
        return false;
    console.log(roles);
    if (roles.length > 0) {
        console.log(context.tokenData);
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === Role.user && context.tokenData.userId)
                return true;
            if (roles[i] === Role.admin && context.tokenData.AdminId)
                return true;
            if (roles[i] === Role.store && context.tokenData.storeId)
                return true;
        }
    }
    else {
        return true;
    } // or false if access is denied
    return false;
};
exports.customAuthChecker = customAuthChecker;
