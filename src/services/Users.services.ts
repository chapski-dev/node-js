import { Request, Response } from "express";
import fs from "fs";
import { IUser } from "types";
import { AppError, HttpCode } from "errors";
import * as bcrypt from "bcrypt";

class UsersService {
  async getUsers(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: IUser[] = JSON.parse(fileContent);

    const minAge = Number(req.query.min);
    const maxAge = Number(req.query.max);
    const ageFilteredUsers = users.filter(
      (el) =>
        (el.age >= minAge && el.age <= maxAge) ||
        el.age >= minAge ||
        el.age <= maxAge ||
        el
    );

    return ageFilteredUsers;
  }

  async getUsersByGender(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: IUser[] = JSON.parse(fileContent);
    console.log(req.params);

    const genderSepareted = users.filter((el) =>
      req.params.gender === "M"
        ? el.isMan
        : req.params.gender === "W"
        ? !el.isMan
        : undefined
    );
    return genderSepareted;
  }

  async getUsersByAge(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: IUser[] = JSON.parse(fileContent);
    console.log("getUsersByAge:", req.query);
  }

  async createUser(req: Request, res: Response) {
    const user: Omit<IUser, "id"> = req.body;
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: IUser[] = JSON.parse(fileContent);
    const isEmailExist = !!users.find((el) => el.email === user.email)?.email;
    const isUsernameExist = !!users.find((el) => el.email === user.email)
      ?.username;
    if (isEmailExist || isUsernameExist) {
      throw new AppError({
        description: "This username or email already exist.",
        httpCode: HttpCode.BAD_REQUEST,
      });
    } else {
      const hashPass = bcrypt.hashSync(user.password, 10);
      const userWithId: IUser = Object.assign(
        { id: users.length + 1, hashPass: hashPass },
        user
      );
      users.push(userWithId);
      fs.writeFileSync("data.json", JSON.stringify(users, null, 2));
      return userWithId;
    }
  }
}

export const usersService = new UsersService();
