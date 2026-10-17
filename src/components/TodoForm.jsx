import { useState } from "react";

const MAX_LENGTH = 100;

export default function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    setText(event.target.value);
    if (error) {
      setError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedText = text.trim();
    if (trimmedText === "") {
      setError("Please enter a task.");
      return;
    }

    onAddTodo(trimmedText);
    setText("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="new-todo" className="visually-hidden">
        New task
      </label>
      <div className="todo-form__row">
        <input
          id="new-todo"
          className="todo-form__input"
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="What needs to be done?"
          maxLength={MAX_LENGTH}
          autoComplete="off"
          aria-invalid={error !== ""}
          aria-describedby={error ? "new-todo-error" : undefined}
        />
        <button type="submit" className="todo-form__button">
          Add
        </button>
      </div>
      {error && (
        <p id="new-todo-error" className="todo-form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
