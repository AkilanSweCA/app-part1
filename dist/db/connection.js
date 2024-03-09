"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbclose = exports.dbconnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbconnect = () => {
    mongoose_1.default
        .connect(process.env.MONGODB_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Failed to connect to MongoDB", err));
};
exports.dbconnect = dbconnect;
const dbclose = () => {
    mongoose_1.default.connection.close();
};
exports.dbclose = dbclose;
