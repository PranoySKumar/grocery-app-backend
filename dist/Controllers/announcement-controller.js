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
const announcement_service_1 = __importDefault(require("../Services/announcement-service"));
class AnnouncementController {
    //get all announcement
    static getAllAnnouncements(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const announcements = yield announcement_service_1.default.getAllAnnouncement();
                res.status(201).json(announcements);
            }
            catch (error) {
                next(error);
            }
        });
    }
    //create announcement
    static createAnnouncement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, title } = req.body;
                yield announcement_service_1.default.createAnnouncement({ message, title });
                res.status(201).json({ created: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AnnouncementController;
