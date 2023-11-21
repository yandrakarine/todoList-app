async function get() {
  return fetch('http://localhost:3000/api/todos').then(async (response) => {
    const todosString = await response.text();
    const todosFromServer = JSON.parse(todosString).todos;
    return todosFromServer;
  });
}
export const todoControllerUi = {
  get,
};
