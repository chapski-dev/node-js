import { AppError, HttpCode, errorHandler } from "errors";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authToken = (req: Request, res: Response, next: NextFunction) => {

  try {
    const authHeader = req.headers.authorization;
    
    const token = authHeader && authHeader.split(" ")[1];
    
    if (token) {
      jwt.verify(
        token,
        'shhhhh',
        (err, user) => {
          if (err) {
            throw new AppError({
              description: "Invalid token",
              httpCode: HttpCode.UNAUTHORIZED,
            });
          }
          req.body.user = user;
          next();
        }
      );
    } else {
      throw new AppError({
        description: "Invalid token",
        httpCode: HttpCode.FORBIDDEN,
      });
    }
  } catch (error: any) {
    return errorHandler.handleError(error, res);
  }
};
