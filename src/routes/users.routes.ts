import { validator } from "./../utils/validator";
import express from "express";
// import validator from "utils/validator";
import { usersController } from "../controllers";

const router = express.Router();
/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Get all users
 *      description: Returns all users from DB
 *      tags:
 *          - Users
 *      responses:
 *          '200':
 *              description: Successfull response
 */
router.get("/", validator.validationGetUsers(), usersController.getUsers);
router.get(
  "/:gender",
  validator.validateGetUsersGender(),
  usersController.getUsersByGender
);
// router.get("/?min=18&max=50", usersController.getUsersByAge);

router.post("/", usersController.createUser);

export default router;
