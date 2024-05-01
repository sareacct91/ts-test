var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor() {
        this.todos = this.getTodos();
        this.isDone = false;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            while (!this.isDone) {
                const title = yield this.askQuestion("What is the todo title? \n");
                const description = yield this.askQuestion("What do you have to do? \n");
                this.todos.push(new Todo(title, description));
                yield this.finished();
            }
            this.saveTodos();
            this.printTodos();
            rl.close();
        });
    }
    askQuestion(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield rl.question(query);
        });
    }
    printTodos() {
        console.log("Todo list: ");
        for (const todo of this.todos) {
            console.log(`Title: ${todo.title}, Description: ${todo.description}`);
        }
    }
    finished() {
        return __awaiter(this, void 0, void 0, function* () {
            const str = yield this.askQuestion("Do you want to add more todo? (Y/N)\n");
            this.isDone = str.toLowerCase() === "n";
        });
    }
    getTodos() {
        try {
            const fileData = fs.readFileSync(path.join(__dirname, "../utils/todos.json"), "utf8");
            if (fileData) {
                return JSON.parse(fileData);
            }
            return [];
        }
        catch (err) {
            console.log("error reading file: ", err);
            return [];
        }
    }
    saveTodos() {
        fs.writeFileSync(path.join(__dirname, "../utils/todos.json"), JSON.stringify(this.todos, null, 2));
    }
}
