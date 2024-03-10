"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_xml_bodyparser_1 = __importDefault(require("express-xml-bodyparser"));
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = require("./middlewares");
const connection_1 = require("./db/connection");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
require("dotenv").config();
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_xml_bodyparser_1.default)({ trim: false, explicitArray: false }));
// Connect to MongoDB
(0, connection_1.dbconnect)();
app.use("/", routes_1.default);
app.use(middlewares_1.errorHandler);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
process
    .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
})
    .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
});
exports.default = app;
