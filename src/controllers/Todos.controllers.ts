import { todosService } from '../services';
import { AppError, HttpCode, errorHandler } from "../errors";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ITodo } from 'types';

class TodosController {
  async getTodos(req: Request, res: Response) {
    const result = await todosService.getTodos(req, res);
    res.send(result);
  }

  async getTodo(req: Request, res: Response) {
    const result = await todosService.getTodo(req, res);
    res.send(result);
  }

  /** POST */
  async createTodo(req: Request<ITodo>, res: Response) {
    const result = await todosService.createTodo(req, res);
    res.send(result);
  }
  /** PUT */
  async updateTodosFully(req: Request, res: Response) {
    const validationErrors = validationResult(req);
    try {
      if (!validationErrors.isEmpty()) {
        throw new AppError({
          description: "Not valid data.",
          httpCode: HttpCode.BAD_REQUEST,
        });
      } else {
        const result = await todosService.updateTodosFully(req, res);
        res.send(result);
      }
    } catch (error: any) {
      errorHandler.handleError(error, res, validationErrors);
    }
  }

  /** PATCH */
  async updateTodosPartly(req: Request, res: Response) {
    console.log("---updateTodosPartly controller---");

    const result = await todosService.updateTodosPartly(req, res);
    res.send(result);
  }

  /** DELETE */
  async deleteTodo(req: Request, res: Response) {
    const result = await todosService.deleteTodo(req, res);
    res.send(result);
  }
}

export const todosController = new TodosController();
