import readline from "readline/promises";
import Todo from "./Todo.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class Cli {
  todos: Todo[] = this.getTodos();
  isDone: boolean = false;

  async init() {
    while (!this.isDone) {
      const title = await this.askQuestion("What is the todo title? \n");
      const description = await this.askQuestion("What do you have to do? \n");
      this.todos.push(new Todo(title, description));
      await this.finished();
    }
    this.saveTodos();
    this.printTodos();
    rl.close();
  }

  private async askQuestion(query: string): Promise<string> {
    return await rl.question(query);
  }

  private printTodos() {
    console.log("Todo list: ");
    for (const todo of this.todos) {
      console.log(`Title: ${todo.title}, Description: ${todo.description}`);
    }
  }

  private async finished() {
    const str = await this.askQuestion("Do you want to add more todo? (Y/N)\n");
    this.isDone = str.toLowerCase() === "n";
  }

  private getTodos() {
    try {
      const fileData = fs.readFileSync(
        path.join(__dirname, "../utils/todos.json"),
        "utf8",
      );
      if (fileData) {
        return JSON.parse(fileData) as Todo[];
      }
      return [];
    } catch (err) {
      console.log("error reading file: ", err);
      return [];
    }
  }

  private saveTodos() {
    fs.writeFileSync(
      path.join(__dirname, "../utils/todos.json"),
      JSON.stringify(this.todos, null, 2),
    );
  }
}
