import { Request, Response } from "express";
import { userService } from "../services";
import { validationResult } from "express-validator";
import { handleErrors } from "../utils/errorsHandler";
import * as Sentry from "@sentry/node";

class AuthController {
  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const resErr = handleErrors(res, errors);
      return resErr;
    } else {
      try {
        res.send("Welcome back!");
      } catch (error: any) {
        Sentry.captureException(error);
        res.send({ error: error.message });
      }
    }

  }
}

export const authController = new AuthController();
