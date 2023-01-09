import fs from "fs";
import { AppError, HttpCode, errorHandler } from "errors";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { authServices } from "services";
import * as bcrypt from "bcrypt";

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

  async createToken(req: Request, res: Response) {
    const validationErrors = validationResult(req);
    const privateKey = fs.readFileSync("../../private.key", "utf8");

    try {
      if (!validationErrors.isEmpty()) {
        throw new AppError({
          description: "Not valid data.",
          httpCode: HttpCode.BAD_REQUEST,
        });
      }
      console.log("req.body", req.body);

      const { email, password } = req.body;
      const user = await authServices.getUser(email);
      if (user) {
        const ID = user.id;
        const isCorrectPassword = await bcrypt.compare(password, user.hashPass);

        if (isCorrectPassword) {
          const token = jwt.sign({ email, ID }, privateKey || "shhhhh");
          res.send({ token });
        } else {
          throw new AppError({
            description: "Not valid password!",
            httpCode: HttpCode.BAD_REQUEST,
          });
        }
      } else {
        throw new AppError({
          description: "User not exist!",
          httpCode: HttpCode.NOT_FOUND,
        });
      }
    } catch (error: any) {
      return errorHandler.handleError(error, res, validationErrors);
    }
  }

  async refreshToken(req: Request, res: Response) {}
}

export const authController = new AuthController();
