"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = require("../Config");
const generateToken = async (body, expiresIn) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(body, (0, Config_1.getEnv)().JWT_SECRET, expiresIn ? { expiresIn } : {}, (error, token) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(token);
        });
    });
};
exports.generateToken = generateToken;
