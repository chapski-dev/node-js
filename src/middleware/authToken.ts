import { Request, Response, NextFunction } from "express";
import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret | GetPublicKeyOrSecret, (err, user) => {
        if (err) throw new Error("invalid token");
        // req.use
        next();
      })

    } else {

    }

  } catch (error) {
    res.send(403)
  }
}