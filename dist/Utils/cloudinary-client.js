"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: "duqmb1rjh",
    api_key: "155312536733783",
    api_secret: "TW2OHvIrKw5hCkpqY85GeLN9Tkc",
});
exports.default = cloudinary_1.v2.uploader;
