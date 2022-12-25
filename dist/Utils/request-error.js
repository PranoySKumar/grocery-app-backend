"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestError = void 0;
class RequestError {
    constructor(statusCode, messge, body) {
        this.statusCode = statusCode;
        this.message = messge;
        this.body = body;
    }
}
exports.RequestError = RequestError;
