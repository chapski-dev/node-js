import { validator } from "utils";
import { authController } from "controllers";
import express from "express";
import { authToken } from "middleware";

const router = express.Router();

router.post("/login", authToken, validator.validateEmail(), authController.login);
router.post("/get-token", validator.validateEmail(), authController.createToken);


export default router;
