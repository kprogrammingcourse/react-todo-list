import { useEffect } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoFilters from "./components/TodoFilters.jsx";
import TodoList from "./components/TodoList.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { filterTodos } from "./utils/filterTodos.js";
import "./App.css";

const TODOS_STORAGE_KEY = "react-todo-list.todos";
const FILTER_STORAGE_KEY = "react-todo-list.filter";

const INITIAL_TODOS = [
  { id: "sample-1", text: "Set up a React project with Vite", completed: true },
  { id: "sample-2", text: "Learn useState", completed: true },
  { id: "sample-3", text: "Build a to-do list", completed: false },
];

export default function App() {
  const [todos, setTodos] = useLocalStorage(TODOS_STORAGE_KEY, INITIAL_TODOS);
  const [filter, setFilter] = useLocalStorage(FILTER_STORAGE_KEY, "all");

  function handleAddTodo(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos((previousTodos) => [...previousTodos, newTodo]);
  }

  function handleToggleTodo(id) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function handleDeleteTodo(id) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  }

  function handleClearCompleted() {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => !todo.completed),
    );
  }

  const visibleTodos = filterTodos(todos, filter);
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  useEffect(() => {
    document.title =
      activeCount > 0 ? `(${activeCount}) To-Do List` : "To-Do List";
  }, [activeCount]);

  return (
    <div className="app">
      <main className="todo-app">
        <header className="todo-app__header">
          <h1>To-Do List</h1>
          <p className="todo-app__summary">
            {activeCount} {activeCount === 1 ? "task" : "tasks"} left
          </p>
        </header>

        <TodoForm onAddTodo={handleAddTodo} />

        <TodoFilters currentFilter={filter} onFilterChange={setFilter} />

        <TodoList
          todos={visibleTodos}
          filter={filter}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />

        <div className="todo-app__actions">
          <button
            type="button"
            className="clear-button"
            onClick={handleClearCompleted}
            disabled={completedCount === 0}
          >
            Clear completed ({completedCount})
          </button>
        </div>
      </main>
      <footer className="app__footer">Built with React + Vite</footer>
    </div>
  );
}
