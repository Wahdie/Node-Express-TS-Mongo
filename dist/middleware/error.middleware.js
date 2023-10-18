"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const express_1 = require("express");
const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || error.status || 500;
    express_1.response.status(status).send(error);
};
exports.errorHandler = errorHandler;
