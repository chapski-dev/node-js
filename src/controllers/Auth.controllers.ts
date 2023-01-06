import { HttpCode } from "../errors/AppError";
import { AppError } from "errors/AppError";
import { errorHandler } from "errors/ErrorHandler";
import { Request, Response } from "express";
import { userService } from "../services";
import { validationResult } from "express-validator";
import * as Sentry from "@sentry/node";

class AuthController {
  async login(req: Request, res: Response) {
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) {
        throw new AppError({
          description: "Not valid data.",
          httpCode: HttpCode.BAD_REQUEST,
        });
      } else {
        res.send("Welcome back!");
      }
    } catch (error: any) {
      return errorHandler.handleError(error, res, validationErrors);
    }
  }
}

export const authController = new AuthController();
