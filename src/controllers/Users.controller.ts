import { handleErrors } from './../utils/errorsHandler';
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { usersService } from "services";

class UsersController {
  async getUsers(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorRes = handleErrors(res,errors);
      return errorRes;
    } else {
      const result = await usersService.getUsers(req, res);
      res.send(result);
    }
  }

  async getUsersByGender(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorRes = handleErrors(res,errors);
      return errorRes;
    } else {
      const result = await usersService.getUsersByGender(req, res);
      res.send(result);
    }
  }

  async getUsersByAge(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorRes = handleErrors(res,errors);
      return errorRes;
    } else {
      console.log("getUsersByAge:", req.query);

      const result = await usersService.getUsersByAge(req, res);
      res.send(result);
    }
  }

  async createUser(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorRes = handleErrors(res,errors);
      return errorRes;
    } else {
      const result = await usersService.createUser(req, res);
      res.send(result);
      console.log("createUser req", req.body);
    }
  }
}

export const usersController = new UsersController();
