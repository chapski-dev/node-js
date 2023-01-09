import fs from "fs";
import { IUser } from "types";

class AuthServices {
  async getUser(email: string) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: IUser[] = JSON.parse(fileContent);
    const user = users.find((el) => el?.email === email);

    return user;

    // const user = await UsersCollection.getUserByEmail(email);
  }
}

export const authServices = new AuthServices();
