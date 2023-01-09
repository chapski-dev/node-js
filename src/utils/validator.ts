import { Request } from "express";
import { body, param, query, } from "express-validator";
import { ERROR_MESSAGE } from "../constants";

class Validator {
  validatePost(req?: Request) {
    return [
      body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage(ERROR_MESSAGE.incorect_login),
      body("password")
        .isStrongPassword({
          minLength: 8,
          minLowercase: 1,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 1,
        })
        .withMessage(ERROR_MESSAGE.easy_password),
    ];
  }
  validateEmail(req?: Request) {
    return [
      body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage(ERROR_MESSAGE.incorect_login),
      body("password")
        .isStrongPassword({
          minLength: 8,
          minLowercase: 1,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 1,
        })
        .withMessage(ERROR_MESSAGE.easy_password),
    ];
  }

  validateGetUsersGender(req?: Request) {
    return [
      param('gender')
      .isWhitelisted(["M", "W"])
      .withMessage(ERROR_MESSAGE.get_gender),
    ]
  }

  validationGetUsers(req?: Request) {
    return [
      query("min").optional().exists().withMessage(ERROR_MESSAGE.get_users_ages),
      query('max').optional().exists().withMessage(ERROR_MESSAGE.get_users_ages),
    ]
  }
}

export const validator = new Validator();
