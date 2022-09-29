import e, { Request, Response } from "express";
import fs from "fs";
import { UsersType } from "types";

class UsersService {
  async getUsers(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: UsersType[] = JSON.parse(fileContent);

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
    const users: UsersType[] = JSON.parse(fileContent);
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
    const users: UsersType[] = JSON.parse(fileContent);
    console.log("getUsersByAge:", req.query);
  }

  async createUser(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: UsersType[] = JSON.parse(fileContent);
    users.push(req.body);
    fs.writeFileSync("data.json", JSON.stringify(users, null, 2));
    return fileContent;
  }
}

export const usersService = new UsersService();
