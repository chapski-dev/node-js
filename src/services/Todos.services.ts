import { Request, Response } from "express";
import fs from "fs";
import { ITodo } from "types";
import { v4 as uuidv4 } from "uuid";

const ResourceDescription = {
  type: "object",
  properties: {
    id: "string",
    name: "string",
  },
};

const ResourceStatus = {
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: ["running", "failed", "stopped"],
    },
  },
};

export class TodosService {
  async getTodos(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const todos: ITodo[] = JSON.parse(fileContent).todos;

    return todos;
  }

  async getTodo(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const todos: ITodo[] = JSON.parse(fileContent).todos;
    const todo = todos.find((el) => el.id === req.params.id);
    return todo;
  }

  //POST
  async createTodo(req: Request<ITodo, ITodo, ITodo>, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const todos: ITodo[] = JSON.parse(fileContent).todos;

    const newTodo = Object.assign(req.body, {
      id: uuidv4(),
    });

    todos.push(newTodo);
    fs.writeFileSync("data.json", JSON.stringify(todos, null, 2));
    return newTodo;
  }

  //PUT
  async updateTodosFully(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const todos: ITodo[] = JSON.parse(fileContent).todos;

    const updatedTodos = todos.map((i) =>
      i.id === req.params.id ? req.body : i
    );

    todos.splice(0, todos.length, ...updatedTodos);
    fs.writeFileSync("data.json", JSON.stringify(todos, null, 2));
    return { updated_todo: req.body, todos: updatedTodos };
  }

  //PATCH
  async updateTodosPartly(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const todos: ITodo[] = JSON.parse(fileContent).todos;

    const updateTodoss = todos.map((el) => {
      return el.id === req.params.id ? Object.assign(el, req.body) : el;
    });
    todos.splice(0, todos.length, ...updateTodoss);

    fs.writeFileSync("data.json", JSON.stringify(todos, null, 2));
    const unpdatedTodos = todos.find((el) => el.id === req.params.id);

    return { updated_todo: unpdatedTodos, todos: updateTodoss };
  }

  async deleteTodo(req: Request, res: Response) {
    const fileContent = fs.readFileSync("data.json", "utf8");
    const todos: ITodo[] = JSON.parse(fileContent).todos;

    console.log("---TodosService---");
    console.log(req.params);
    const todo = todos.find((el) => el.id === req.params.id);
    const id = todos.findIndex((el) => el.id === req.params.id);
    todos.splice(id, 1);
    fs.writeFileSync("data.json", JSON.stringify(todos, null, 2));

    return { deleted_todo: todo, todos: todos };
  }
}

export const todosService = new TodosService();
