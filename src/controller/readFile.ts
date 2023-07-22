import { Request, Response } from "express";
import path from "path";
import { users, successResponse, errorResponse } from "../utils/utils";
import { User } from "../utils/types";

export const getAllUsers = async (_req: Request, res: Response) => {
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

  const filePath = path.join(__dirname, "../../Data/users.csv");

  try {
    const usersData = await users(filePath);
    successResponse.data = usersData;
    res.send(successResponse);
  } catch (err: any) {
    errorResponse.message = err.message;
    res.send(errorResponse);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../../Data/users.csv");
  try {
    const usersData: User[] = await users(filePath);
    const Id: number | undefined = req.body?.id;

    if (!Id) {
      errorResponse.message = "Please provide the user id";
      return res.send(errorResponse);
    }

    const user: User | undefined = usersData.find((user) => user.id === Id);

    if (!user) {
      errorResponse.message = "User not found";
      return res.send(errorResponse);
    }

    successResponse.data = user;
    res.send(successResponse);
  } catch (err: any) {
    errorResponse.message = err.message;
    res.send(errorResponse);
  }
};
