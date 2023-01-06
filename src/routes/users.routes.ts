import { validator } from "./../utils/validator";
import express from "express";
import { usersController } from "../controllers";

const router = express.Router();
router.get("/", validator.validationGetUsers(), usersController.getUsers);


router.get(
  "/:gender",
  validator.validateGetUsersGender(),
  usersController.getUsersByGender
);

// router.get("/?min=18&max=50", usersController.getUsersByAge);

router.post("/", usersController.createUser);

export default router;
