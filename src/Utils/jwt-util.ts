import jwt from "jsonwebtoken";
import { getEnv } from "../Config";

export const generateToken = async (body: any, expiresIn?: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(body, getEnv().JWT_SECRET, expiresIn ? { expiresIn } : {}, (error, token) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(token as string);
    });
  });
};
