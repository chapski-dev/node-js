import { Request, Response } from "express";
import { userService } from "../services";
import { validationResult } from "express-validator";
import { handleErrors } from "../utils/errorsHandler";

class AuthController {
  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const resErr = handleErrors(res, errors);
      return resErr;
    }
    res.send("Welcome back!");
  }
}

export const authController = new AuthController();
