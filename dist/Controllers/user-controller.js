"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Services_1 = require("../Services");
class UserController {
    //get all users
    static async getAllUsers(req, res, next) {
        try {
            const users = await Services_1.UserService.findAllUsers({}, { createdAt: 0, updatedAt: 0 });
            res.status(200).json(users);
        }
        catch (error) {
            next(error);
        }
    }
    //find single user by id
    static async getSingleUser(req, res, next) {
        try {
            const { userId } = req.params;
            const { userId: tokenUserId } = req.body.tokenData;
            const user = await Services_1.UserService.findUserById(tokenUserId !== null && tokenUserId !== void 0 ? tokenUserId : userId, {
                createdAt: 0,
                updatedAt: 0,
            });
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    //delete user
    static async deleteUser(req, res, next) {
        try {
            const { _id } = req.params;
            await Services_1.UserService.deleteUser(_id);
            res.status(201).json({ deleted: true });
        }
        catch (error) {
            next(error);
        }
    }
    //update user details.
    static async updateUserDetails(req, res, next) {
        try {
            const { userId } = req.params;
            const { userId: tokenUserId } = req.body.tokenData;
            const userDetails = req.body.userDetails;
            const profileImage = req.file;
            const user = await Services_1.UserService.findUserById(tokenUserId !== null && tokenUserId !== void 0 ? tokenUserId : userId);
            // if profile image is present create a url resource.
            if (profileImage) {
                if (user === null || user === void 0 ? void 0 : user.profileImageUrl)
                    await Services_1.FileService.deleteImage(user.profileImageUrl);
                userDetails.profileImageUrl = await Services_1.FileService.saveImage(profileImage);
            }
            await Services_1.UserService.updateUserDetails(tokenUserId !== null && tokenUserId !== void 0 ? tokenUserId : userId, userDetails);
            res.status(201).json({ updated: true });
        }
        catch (error) {
            next(error);
        }
    }
    //create new user
    static async createUser(req, res, next) {
        try {
            const userDetails = req.body;
            const profileImage = req.file;
            const user = await Services_1.UserService.findUserById(userDetails._id.toString());
            // if the user is already present don't create a new one.
            if (user)
                return res.status(406).json({ created: false, message: "user already present" });
            // if profile image is present create a url resource.
            if (profileImage)
                userDetails.profileImageUrl = await Services_1.FileService.saveImage(profileImage);
            const newUser = await Services_1.UserService.createUser(userDetails);
            res.status(201).json({ created: true, user: newUser });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = UserController;
