export function filterTodos(todos, filter) {
  if (filter === "active") {
    return todos.filter((todo) => !todo.completed);
  }
  if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}
