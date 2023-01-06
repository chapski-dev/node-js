import { AppError, HttpCode, errorHandler } from "errors";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { usersService } from "services";

class UsersController {
  async getUsers(req: Request, res: Response) {
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) {
        throw new AppError({
          description: "Not valid data.",
          httpCode: HttpCode.BAD_REQUEST,
        });
      } else {
        const result = await usersService.getUsers(req, res);
        res.send(result);
      }
    } catch (error: any) {
      return errorHandler.handleError(error, res, validationErrors);
    }
  }

  async getUsersByGender(req: Request, res: Response) {
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) {
        throw new AppError({
          description: "Not valid data.",
          httpCode: HttpCode.BAD_REQUEST,
        });
      } else {
        const result = await usersService.getUsersByGender(req, res);
        res.send(result);
      }
    } catch (error: any) {
      return errorHandler.handleError(error, res, validationErrors);
    }
  }

  async getUsersByAge(req: Request, res: Response) {
    const validationErrors = validationResult(req);

    try {
      if (!validationErrors.isEmpty()) {
        throw new AppError({
          description: "Not valid data.",
          httpCode: HttpCode.BAD_REQUEST,
        });
      } else {
        const result = await usersService.getUsersByAge(req, res);
        res.send(result);
      }
    } catch (error: any) {
      return errorHandler.handleError(error, res, validationErrors);
    }
  }

  async createUser(req: Request, res: Response) {
    const validationErrors = validationResult(req);
    try {
      if (!validationErrors.isEmpty()) {
        throw new AppError({
          description: "Not valid data.",
          httpCode: HttpCode.BAD_REQUEST,
        });
      } else {
        const result = await usersService.createUser(req, res);
        res.send(result);
      }
    } catch (error: any) {
      return errorHandler.handleError(error, res, validationErrors);
    }
  }
}

export const usersController = new UsersController();
