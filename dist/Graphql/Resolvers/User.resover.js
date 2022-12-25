"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = require("../../Models");
class UserResolver {
    static getSingleUser(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tokenData } = context;
            let userId;
            if (args.id)
                userId = args.id;
            else
                userId = tokenData.userId;
            return yield Models_1.User.findById(userId).populate("coupons").populate("favourites");
        });
    }
    static getAllUsers(parent, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tokenData } = context.body;
            // if (!tokenData.dashboardId) {
            //   // if not dashboard return;
            //   return null;
            // }
            return yield Models_1.User.find().populate("coupons").populate("favourites");
        });
    }
}
exports.default = UserResolver;
const userResolver = {
    user: {
        type: userType,
        args: { id: { type: GraphQLString } },
        resolve: UserResolver.getSingleUser,
    },
};
