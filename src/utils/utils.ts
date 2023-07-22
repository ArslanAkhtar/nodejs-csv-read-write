import { createReadStream, ReadStream, createWriteStream } from "fs";
import readline from "readline";
import { ResponseData, User } from "./types";
import { resolve } from "path";
import { get } from "http";

export const successResponse: ResponseData = {
  status: "success",
  statusCode: 200,
};

export const errorResponse: ResponseData = {
  status: "error",
  statusCode: 500,
};

export const users = (filePath: string): Promise<User[]> => {
  const UserListPromise = new Promise<User[]>((resolve, reject) => {
    const userList: User[] = [];
    const fileStream: ReadStream = createReadStream(filePath, {
      encoding: "utf-8",
    });

    const users: User[] = [];
    let lineCount = 0;

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on("line", (line: string) => {
      if (lineCount !== 0) {
        const [id, name, email, Roll] = line.split(",");
        const user: User = {
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

export const writeUsers = (
  filePath: string,
  users: User[]
): Promise<string> => {
  const UserListPromise = new Promise<string>((resolve, reject) => {
    users.length === 0 && reject("Please provide the user data");
    const writableStream = createWriteStream(filePath, { encoding: "utf8" });

    writableStream.write("id,name,email,Roll\n");

    users.forEach((user) => {
      writableStream.write(
        `${user.id},${user.name},${user.email},${user.Roll}\n`
      );
    });

    writableStream.on("error", (err: NodeJS.ErrnoException) => {
      console.error("Error writing to the file:", err.message);
      reject(err);
    });

    writableStream.end();
    resolve("success");
  });

  return UserListPromise;
};

export const writeUsersById = async (
  filePath: string,
  user: User,
  id: number
) => {
  let allUsers: User[] = [];

  if (!id) {
    return "Please provide the user id";
  }

  try {
    allUsers = await users(filePath);
  } catch (err: any) {
    return err.message;
  }

  const userIndex = allUsers.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return "User not found";
  }
  allUsers[userIndex] = user;
  try {
    await writeUsers(filePath, allUsers);
    return "success";
  } catch (err: any) {
    return err.message;
  }
};
