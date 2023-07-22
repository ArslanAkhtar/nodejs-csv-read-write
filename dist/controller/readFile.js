"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils/utils");
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    ! This code is for reading the file and sending the data
    to the client it works fine for small data but for large
    data it will take time to read the file and send the data to the client/
  
    const fileData: string = fs.readFileSync(filePath, { encoding: "utf-8" });
  
    const rows: string[] = fileData.split("\n");
    console.log(rows);
  
    const users: User[] = rows.slice(1).map((row: string, index: number) => {
      const [id, name, email, Roll] = line.split(",");
      const user: User = {
        id: parseInt(id),
        name
        email,
        Roll,
      };
      return user;
    });
  
    res.send({
      status: "success",
      data: users,
      statusCode: 200,
    });
    !----------------------------------------------------------------!
    */
    const filePath = path_1.default.join(__dirname, "../../Data/users.csv");
    try {
        const usersData = yield (0, utils_1.users)(filePath);
        utils_1.successResponse.data = usersData;
        res.send(utils_1.successResponse);
    }
    catch (err) {
        utils_1.errorResponse.message = err.message;
        res.send(utils_1.errorResponse);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filePath = path_1.default.join(__dirname, "../../Data/users.csv");
    try {
        const usersData = yield (0, utils_1.users)(filePath);
        const Id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
        if (!Id) {
            utils_1.errorResponse.message = "Please provide the user id";
            return res.send(utils_1.errorResponse);
        }
        const user = usersData.find((user) => user.id === Id);
        if (!user) {
            utils_1.errorResponse.message = "User not found";
            return res.send(utils_1.errorResponse);
        }
        utils_1.successResponse.data = user;
        res.send(utils_1.successResponse);
    }
    catch (err) {
        utils_1.errorResponse.message = err.message;
        res.send(utils_1.errorResponse);
    }
});
exports.getUserById = getUserById;
//# sourceMappingURL=readFile.js.map