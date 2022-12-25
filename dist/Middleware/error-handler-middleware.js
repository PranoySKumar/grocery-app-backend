"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_error_1 = require("../Utils/request-error");
//Error handing middle ware.
const errorHandler = (err, req, res, next) => {
    if (err instanceof request_error_1.RequestError) {
        res.status(err.statusCode).json({ error: { message: err.message, body: err.body } });
    }
    else {
        console.error(err);
        res.status(500).json({ error: { message: "Server Error" } });
    }
};
exports.default = errorHandler;
