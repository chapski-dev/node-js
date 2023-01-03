import { handleErrors } from "./../utils/errorsHandler";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { usersService } from "services";
import * as Sentry from "@sentry/node";

class UsersController {
  async getUsers(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorRes = handleErrors(res, errors);
      return errorRes;
    } else {
      try {
        const result = await usersService.getUsers(req, res);
        res.send(result);
      } catch (error: any) {
        Sentry.captureException(error);
        res.send({ error: error.message });
      }
    }
  }

  async getUsersByGender(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorRes = handleErrors(res, errors);
      return errorRes;
    } else {
      try {
        const result = await usersService.getUsersByGender(req, res);
        res.send(result);
      } catch (error: any) {
        Sentry.captureException(error);
        res.send({ error: error.message });
      }
    }
  }

  async getUsersByAge(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorRes = handleErrors(res, errors);
      return errorRes;
    } else {
      try {
        console.log("getUsersByAge:", req.query);
        const result = await usersService.getUsersByAge(req, res);
        res.send(result);
      } catch (error: any) {
        Sentry.captureException(error);
        res.send({ error: error.message });
      }
    }
  }

  async createUser(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorRes = handleErrors(res, errors);
      return errorRes;
    } else {
      try {
        console.log("createUser req", req.body);
        const result = await usersService.createUser(req, res);
        res.send(result);
      } catch (error: any) {
        Sentry.captureException(error);
        res.send({ error: error.message });
      }
    }
  }
}

export const usersController = new UsersController();
