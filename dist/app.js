"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
//import mongoose from "mongoose";
const userRoutes_1 = __importDefault(require("./router/userRoutes"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
const port = 3000;
const server = http_1.default.createServer(app);
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || "");
// mongoose.connection.on("error", () => {
//   console.log("MongoDB connection error. Please make sure MongoDB is running.");
//   process.exit();
// });
server.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});
app.use("/", userRoutes_1.default);
//# sourceMappingURL=app.js.map