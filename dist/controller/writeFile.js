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
exports.createUser = void 0;
const utils_1 = require("../utils/utils");
const utils_2 = require("../utils/utils");
const path_1 = __importDefault(require("path"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const filePath = path_1.default.join(__dirname, "../../Data/users.csv");
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.users)) {
        utils_1.errorResponse.message = "Please provide the user data";
        return res.send(utils_1.errorResponse);
    }
    try {
        const writeUsersData = yield (0, utils_2.writeUsers)(filePath, (_b = req.body) === null || _b === void 0 ? void 0 : _b.users);
        utils_1.successResponse.message = writeUsersData;
        res.send(utils_1.successResponse);
    }
    catch (err) {
        utils_1.errorResponse.message = err.message;
        res.send(utils_1.errorResponse);
    }
});
exports.createUser = createUser;
//# sourceMappingURL=writeFile.js.map