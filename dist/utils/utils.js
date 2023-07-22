"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeUsersById = exports.writeUsers = exports.users = exports.errorResponse = exports.successResponse = void 0;
const fs_1 = require("fs");
const readline_1 = __importDefault(require("readline"));
exports.successResponse = {
    status: "success",
    statusCode: 200,
};
exports.errorResponse = {
    status: "error",
    statusCode: 500,
};
const users = (filePath) => {
    const UserListPromise = new Promise((resolve, reject) => {
        const userList = [];
        const fileStream = (0, fs_1.createReadStream)(filePath, {
            encoding: "utf-8",
        });
        const users = [];
        let lineCount = 0;
        const rl = readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        rl.on("line", (line) => {
            if (lineCount !== 0) {
                const [id, name, email, Roll] = line.split(",");
                const user = {
                    id: parseInt(id),
                    name,
                    email,
                    Roll,
                };
                userList.push(user);
            }
            lineCount++;
        });
        rl.on("close", () => {
            resolve(userList);
        });
        rl.on("error", (err) => {
            reject(err);
        });
    });
    return UserListPromise;
};
exports.users = users;
const writeUsers = (filePath, users) => {
    const UserListPromise = new Promise((resolve, reject) => {
        users.length === 0 && reject("Please provide the user data");
        const writableStream = (0, fs_1.createWriteStream)(filePath, { encoding: "utf8" });
        writableStream.write("id,name,email,Roll\n");
        users.forEach((user) => {
            writableStream.write(`${user.id},${user.name},${user.email},${user.Roll}\n`);
        });
        writableStream.on("error", (err) => {
            console.error("Error writing to the file:", err.message);
            reject(err);
        });
        writableStream.end();
        resolve("success");
    });
    return UserListPromise;
};
exports.writeUsers = writeUsers;
const writeUsersById = (filePath, users, id) => { };
exports.writeUsersById = writeUsersById;
//# sourceMappingURL=utils.js.map