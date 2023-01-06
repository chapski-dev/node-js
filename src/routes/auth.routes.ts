import { validator } from "../utils";
import { authController } from "../controllers";
import express from "express";

const router = express.Router();

router.post("/", validator.validatePost(), authController.login);

export default router;
