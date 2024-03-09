"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_xml_bodyparser_1 = __importDefault(require("express-xml-bodyparser"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
require("dotenv").config();
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_xml_bodyparser_1.default)());
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
app.use("/", routes_1.default);
app.use(middlewares_1.errorHandler);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
