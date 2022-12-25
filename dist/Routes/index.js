"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRoutes = exports.userRoutes = void 0;
var routes_1 = require("./user/routes");
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return __importDefault(routes_1).default; } });
var routes_2 = require("./store/routes");
Object.defineProperty(exports, "storeRoutes", { enumerable: true, get: function () { return __importDefault(routes_2).default; } });
