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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const User_model_1 = __importDefault(require("../Models/User.model"));
const jwt_util_1 = require("../Utils/jwt-util");
class AuthService {
    static userLogin(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_model_1.default.findOne({ _id: phoneNumber });
            //generates token.
            const token = yield (0, jwt_util_1.generateToken)({ phoneNumber });
            //If the user is already there just send that user's details else create a new user.
            if (user) {
                return { token, user };
            }
            else {
                const newUser = yield new User_model_1.default({ _id: phoneNumber }).save();
                return { token, user: newUser };
            }
        });
    }
}
exports.AuthService = AuthService;
