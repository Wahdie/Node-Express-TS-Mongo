"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = "mongodb://127.0.0.1:27017/contactmu";
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on('error', (error) => {
    console.error('Koneksi MongoDB gagal:', error);
});
exports.default = mongoose_1.default;
