import { Response, Request, Router } from "express";
import { getAllUsers, getUserById } from "../controller/readFile";
import { createUser, updateUserById } from "../controller/writeFile";

const router = Router();

router.get("/getAllUsers", (req: Request, res: Response) => {
  getAllUsers(req, res);
});

router.get("/getUserById", (req: Request, res: Response) => {
  getUserById(req, res);
});

router.post("/createUsers", (req: Request, res: Response) => {
  createUser(req, res);
});

router.put("/updateUserById", (req: Request, res: Response) => {
  updateUserById(req, res);
  //   res.send("updateUserById");
});

router.use((_req: Request, res: Response) => {
  res.status(404).send("404 - Not Found");
});

export default router;
