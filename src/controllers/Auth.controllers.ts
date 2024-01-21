import fs from "fs";
import { AppError, HttpCode, errorHandler } from "errors";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { authServices, userService, usersService } from "services";
import * as bcrypt from "bcrypt";
import { IRegister } from "types/auth";

class AuthController {
  async login(req: Request, res: Response) {
    // console.log('req', req);
    
    const validationErrors = validationResult(req);
    // console.log('validationErrors', validationErrors);
    
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
    // const privateKey = fs.readFileSync("../../private.key", "utf8");
    const privateKey = 'shhhhh';
    try {
      if (!validationErrors.isEmpty()) {
        throw new AppError({
          description: "Not valid data.",
          httpCode: HttpCode.BAD_REQUEST,
        });
      }

      const { email, password } = req.body as {email: string, password: string};

      const user = await authServices.getUser(email);
      if (user) {
        const ID = user.id;
        const isCorrectPassword = await bcrypt.compare(password, user.hashPass);

        if (isCorrectPassword) {
          const token = jwt.sign({ email, ID }, privateKey, process.env.ACCESS_TOKEN_SECRET as jwt.SignOptions);
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

  async register (req: Request<IRegister, IRegister, IRegister>, res: Response) {
    try {
      const { username, email, password } = req.body;
  
      // Проверка, что пользователь с таким email не существует
      const existingUser = await userService.findOne(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }
  
      // Хэширование пароля
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Создание нового пользователя
      const newUser = await usersService.createUser(req, res);

      res.status(200).json({ newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка регистрации пользователя" });
    }
  }
}

export const authController = new AuthController();
