import { v4 as uuid } from 'uuid';
import fs from 'fs';
const DB_FILE_PATH = './core/db';

// console.log('[CRUD]');
interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}
type UUID = string;

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
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
      4,
    ),
  );
  return todo;
}

export function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  const db = JSON.parse(dbString || '{}'); // fazendo o tratamento de erro caso o db esteja vazio
  if (!db.todos) {
    return [];
  }
  return db.todos;
}

function update(id: UUID, partialTodo: Partial<Todo>) {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isTodoToUpdate = id === currentTodo.id;
    if (isTodoToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 4));
  if (!updatedTodo) {
    throw new Error('Please provide another ID');
  }
  return updatedTodo;
}

function updateContentById(id: UUID, content: string): Todo {
  return update(id, {
    content: content,
  });
}

function deleteById(id: UUID) {
  const todosFromDb = read();
  const todosWithoutOne = todosFromDb.filter((todo) => todo.id !== id);
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos: todosWithoutOne,
      },
      null,
      4,
    ),
  );
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, '');
}

// SIMULATION
// clearDB();
// create('bom dia!!');
// create('boa tarde');
// const terceiraTodo = create('boa noite');
// update(terceiraTodo.id, {
//   content: 'atualizando a terceira todo',
//   done: true,
// });
// create('essa é a quarta todo');
// const quintaTodo = create('essa é a quinta todo');
// create('essa é a sexta todo');
// // updateContentById(terceiraTodo.id, "Olha aqui!");
// const readTodos = read();
// deleteById(quintaTodo.id);
// console.log(readTodos);
