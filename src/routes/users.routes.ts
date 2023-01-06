import { validator } from "./../utils/validator";
import express from "express";
import { usersController } from "../controllers";

const router = express.Router();
/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Get all users or users filtered by age range if query exists
 *      description: Returns users array
 *      tags:
 *          - Users
 *      parameters:
 *        - in: query
 *          name: min
 *          required: false
 *          description: Set an min age of users to get (from 10 to 100)
 *          type: integer
 *        - in: query
 *          name: max
 *          required: false
 *          description: Set an max age of users to get (from 10 to 100)
 *          type: integer
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items: 
 *                  $ref: "#/components/responses/User"
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties: 
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  errors:
 *                    type: array
 *                    items:
 *                      type: object                 
 *                      properties:
 *                        value:
 *                          type: string
 *                          example: 3
 *                        msg:
 *                          type: string
 *                          example: Минимальный возраст должен быть целым числом от 10 до 100
 *                        param:
 *                          type: string
 *                          example: min
 *                        location:
 *                          type: string
 *                          example: query
 */
router.get("/", validator.validationGetUsers(), usersController.getUsers);


router.get(
  "/:gender",
  validator.validateGetUsersGender(),
  usersController.getUsersByGender
);

// router.get("/?min=18&max=50", usersController.getUsersByAge);

/**
 * @swagger
 *  /api/users:
 *    post:
 *      summary: Add new user and return new user object with ID if success
 *      description:
 *          Register "User" object.
 *      tags:
 *          - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/User"
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/User"
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/responses/ValidationError"
 * components:
 *   requestBodies:
 *     User:
 *       description: Users object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Chapski
 *                 description: Users' name
 *               username:
 *                 type: string
 *                 example: chappa_savage
 *                 description: Username
 *               email:
 *                 type: string
 *                 example: example@example.com
 *                 description: Users' email
 *               password: 
 *                 type: string
 *                 example: 1Sq_22qw
 *                 description: Users' password (min length - 8 symbols, min 1 uppercase, min 1 lowercase, min 1 number, min 1 symbol) 
 *               isMan:
 *                 type: boolean
 *                 example: true
 *                 description: Man or woman
 *               age:
 *                 type: integer
 *                 example: 25
 *                 description: Users' age
 *             required:
 *               - name
 *               - username
 *               - email
 *               - password
 *               - isMan
 *               - age
 *   schemas:
 *     User:
 *       description: Users object
 *       properties:
 *         ID:
 *           type: string
 *           example: 63452ed7d18c1bb917ecf031
 *         name:
 *           type: string
 *           example: Chapski
 *         username:
 *           type: string
 *           example: chappa_savageg
 *         email:
 *           type: string
 *           example: example@example.com
 *         password:
 *           type: string
 *           example: 1Sq_22qw
 *         isMan:
 *           type: boolean
 *           example: true
 *         age:
 *           type: integer
 *           example: 25
 *       required:
 *         - ID
 *         - name
 *         - username
 *         - email
 *         - password
 *         - isMan
 *         - age
 */
router.post("/", usersController.createUser);

export default router;
