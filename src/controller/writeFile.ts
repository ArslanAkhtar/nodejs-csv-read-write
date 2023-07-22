import { Request, Response } from "express";
import { errorResponse, successResponse, users } from "../utils/utils";
import { writeUsers, writeUsersById } from "../utils/utils";
import path from "path";

export const createUser = async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../../Data/users.csv");
  if (!req.body?.users) {
    errorResponse.message = "Please provide the user data";
    return res.send(errorResponse);
  }

  try {
    const writeUsersData = await writeUsers(filePath, req.body?.users);
    successResponse.message = writeUsersData;
    res.send(successResponse);
  } catch (err: any) {
    errorResponse.message = err.message;
    res.send(errorResponse);
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../../Data/users.csv");

  if (!req.body?.Id) {
    errorResponse.message = "Please provide the user Id";
    return res.send(errorResponse);
  }
  if (!req.body?.user) {
    errorResponse.message = "Please provide the user data";
    return res.send(errorResponse);
  }

  try {
    const writeUsersData = await writeUsersById(
      filePath,
      req.body?.user,
      req.body?.Id
    );
    successResponse.message = writeUsersData;
    res.send(successResponse);
  } catch (err: any) {
    errorResponse.message = err.message;
    res.send(errorResponse);
  }
};
