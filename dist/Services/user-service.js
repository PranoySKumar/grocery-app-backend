"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Models_1 = require("../Models");
class UserService {
    //find single user by id
    async findUserById(_id) {
        return await Models_1.User.findById(_id).populate("favourites").populate("coupons");
    }
    //find all users.
    async findAllUsers(filter, limit, skip, sort) {
        return await Models_1.User.find(filter)
            .populate("favourites")
            .populate("coupons")
            .limit(limit)
            .skip(skip)
            .sort(sort);
    }
    //create new user.
    async createUser(data) {
        return await new Models_1.User(data).save();
    }
    //delete single user
    async deleteUser(_id) {
        return await Models_1.User.deleteOne({ _id });
    }
    //update  user details
    async updateUserDetails(_id, userDetails) {
        if (userDetails.favourites) {
            userDetails.favourites = userDetails.favourites.map((item) => new mongoose_1.Types.ObjectId(item));
        }
        if (userDetails.coupons) {
            userDetails.coupons = userDetails.coupons.map((item) => new mongoose_1.Types.ObjectId(item));
        }
        return await Models_1.User.updateOne({ _id }, { $set: userDetails }, {
            runValidators: true,
            omitUndefined: true,
        });
    }
}
exports.default = UserService;
