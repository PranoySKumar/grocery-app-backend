"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const request_error_1 = require("../Utils/request-error");
//Error handing middle ware.
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof request_error_1.RequestError) {
        res.status(err.statusCode).json({ error: { message: err.message, body: err.body } });
    }
    else {
        res.status(500).json({ error: { message: "Server Error" } });
    }
};
exports.errorHandler = errorHandler;
