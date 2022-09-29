import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { usersService } from "services";

class UsersController {
  async getUsers(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("--Error--");
      return res.status(400).send({
        success: false,
        errors: errors.array(),
      });
    } else {
      const result = await usersService.getUsers(req, res);
      res.send(result);
    }
  }

  async getUsersByGender(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("--Error--");
      return res.status(400).send({
        success: false,
        errors: errors.array(),
      });
    } else {
      const result = await usersService.getUsersByGender(req, res);
      res.send(result);
    }
  }

  async getUsersByAge(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("--Error--");
      return res.status(400).send({
        success: false,
        errors: errors.array(),
      });
    } else {
      console.log("getUsersByAge:", req.query);

      const result = await usersService.getUsersByAge(req, res);
      res.send(result);
    }
  }

  async createUser(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("--Error--");
      return res.status(400).send({
        success: false,
        errors: errors.array(),
      });
    } else {
      const result = await usersService.createUser(req, res);
      res.send(result);
      console.log("createUser req", req.body);
    }
  }
}

export const usersController = new UsersController();
