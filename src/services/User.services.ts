import { Request, Response } from "express";
import fs from "fs";
import { IUser } from "types";

export class UserService {
  async getUser(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: IUser[] = JSON.parse(fileContent);
    const user = users.find((el) => el.id === req.params.id);
    res.send(user);
  }

  //PUT
  async updateUserFully(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: IUser[] = JSON.parse(fileContent);

    const updatedUser = users.map((i) =>
      i.id === req.params.id ? req.body : i
    );

    users.splice(0, users.length, ...updatedUser);
    fs.writeFileSync("data.json", JSON.stringify(users, null, 2));
    return { updated_user: req.body, users: updatedUser };
  }

  //PATCH
  async updateUserPartly(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: IUser[] = JSON.parse(fileContent);

    const updateUsers = users.map((el) => {
      return el.id === req.params.id ? Object.assign(el, req.body) : el;
    });
    users.splice(0, users.length, ...updateUsers);

    fs.writeFileSync("data.json", JSON.stringify(users, null, 2));
    const unpdatedUser = users.find((el) => el.id === req.params.id);

    return { updated_user: unpdatedUser, users: updateUsers };
  }

  async deleteUser(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const users: IUser[] = JSON.parse(fileContent);

    console.log("---UserService---");
    console.log(req.params);
    const user = users.find((el) => el.id === req.params.id);
    const id = users.findIndex((el) => el.id === req.params.id);
    users.splice(id, 1);
    fs.writeFileSync("data.json", JSON.stringify(users, null, 2));

    return { deleted_user: user, users: users };
  }
}

export const userService = new UserService();
