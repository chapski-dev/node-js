import { todosController } from './../controllers/Todos.controllers';
import express from "express";

const router = express.Router();

router.get("/", todosController.getTodos);
router.get("/:id", todosController.getTodo);
router.post("/", todosController.createTodo);
router.put("/:id", todosController.updateTodosFully);
router.patch("/:id", todosController.updateTodosPartly);

export default router;
