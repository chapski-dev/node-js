import { AppError, HttpCode, errorHandler } from "errors";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userService } from "services";

class UserController {
  async getUser(req: Request, res: Response) {
    const result = await userService.getUser(req, res);
    res.send(result);
  }

  //PUT
  async updateUserFully(req: Request, res: Response) {
    const validationErrors = validationResult(req);
    try {
      if (!validationErrors.isEmpty()) {
        throw new AppError({
          description: "Not valid data.",
          httpCode: HttpCode.BAD_REQUEST,
        });
      } else {
        const result = await userService.updateUserFully(req, res);
        res.send(result);
      }
    } catch (error: any) {
      errorHandler.handleError(error, res, validationErrors);
    }
  }

  //PATCH
  async updateUserPartly(req: Request, res: Response) {
    console.log("---updateUserPartly controller---");

    const result = await userService.updateUserPartly(req, res);
    res.send(result);
  }

  async deleteUser(req: Request, res: Response) {
    const result = await userService.deleteUser(req, res);
    res.send(result);
  }
}

export const userController = new UserController();
