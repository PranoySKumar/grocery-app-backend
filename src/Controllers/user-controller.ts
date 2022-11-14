import { Request, Response, NextFunction } from "express";
import { IUser } from "../Models";
import { FileService, UserService } from "../Services";

export default class UserController {
  //get all users
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.findAllUsers({}, { createdAt: 0, updatedAt: 0 });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  //find single user by id
  static async getSingleUser(req: Request<{ _id: string }>, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;
      const user = await UserService.findUserById(_id, { createdAt: 0, updatedAt: 0 });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  //delete user
  static async deleteUser(req: Request<{ _id: string }>, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;
      await UserService.deleteUser(_id);
      res.status(201).json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }

  //update user details.
  static async updateUserDetails(
    req: Request<{ _id: string }, any, IUser>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { _id } = req.params;
      const userDetails = req.body;
      const profileImage = req.file;

      const user = await UserService.findUserById(_id);

      // if profile image is present create a url resource.
      if (profileImage) {
        if (user?.profileImageUrl) await FileService.deleteImage(user.profileImageUrl);
        userDetails.profileImageUrl = await FileService.saveImage(profileImage);
      }

      await UserService.updateUserDetails(_id, userDetails);

      res.status(201).json({ updated: true });
    } catch (error) {
      next(error);
    }
  }

  //create new user
  static async createUser(req: Request<any, any, IUser>, res: Response, next: NextFunction) {
    try {
      const userDetails = req.body;
      const profileImage = req.file;

      const user = await UserService.findUserById(userDetails._id.toString());

      // if the user is already present don't create a new one.
      if (user) return res.status(406).json({ created: false, message: "user already present" });

      // if profile image is present create a url resource.
      if (profileImage) userDetails.profileImageUrl = await FileService.saveImage(profileImage);

      const newUser = await UserService.createUser(userDetails);
      res.status(201).json({ created: true, user: newUser });
    } catch (error) {
      next(error);
    }
  }
}
