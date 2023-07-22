"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const readFile_1 = require("../controller/readFile");
const writeFile_1 = require("../controller/writeFile");
const router = (0, express_1.Router)();
router.get("/getAllUsers", (req, res) => {
    (0, readFile_1.getAllUsers)(req, res);
});
router.get("/getUserById", (req, res) => {
    (0, readFile_1.getUserById)(req, res);
});
router.post("/createUsers", (req, res) => {
    (0, writeFile_1.createUser)(req, res);
});
router.put("/updateUserById", (req, res) => {
    res.send("updateUserById");
});
router.use((_req, res) => {
    res.status(404).send("404 - Not Found");
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map