import fs from "fs";
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

interface Todo {
  date: string;
  content: string;
  done: boolean;
}

function create(content: string) {
  const todo: Todo = {
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos = [...read(), todo];

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      4
    )
  );
  return content;
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}"); // fazendo o tratamento de erro caso o db esteja vazio
  if (!db.todos) {
    return [];
  }
  return db.todos;
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// SIMULATION
clearDB();
create("bom dia!!");
create("boa tarde");
create("boa noite");
console.log(read());
