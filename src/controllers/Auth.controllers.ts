import { Request, Response } from "express";
import { userService } from "../services";
import fs from "fs";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { login, password } = req.body;
      // const user = await userServices.getUser(login);

      // if(user) {
      //   const compareUser = await bcrypt.compare(password, user.password);

      // }
    } catch (error) {}
  }
}

export const authController = new AuthController();