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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("--Error--");
      return res.status(400).send({
        success: false,
        errors: errors.array(),
      });
    } else {
      const result = await userService.updateUserFully(req, res);
      res.send(result);
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
