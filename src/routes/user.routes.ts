import express from "express";
import { userController } from "controllers";

const router = express.Router();

router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUserFully);
router.patch("/:id", userController.updateUserPartly);
router.delete("/:id", userController.deleteUser);


export default router;
