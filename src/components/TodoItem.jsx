export default function TodoItem({ todo, onToggle, onDelete }) {
  const checkboxId = `todo-${todo.id}`;

  return (
    <li
      className={
        todo.completed ? "todo-item todo-item--completed" : "todo-item"
      }
    >
      <input
        id={checkboxId}
        type="checkbox"
        className="todo-item__checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <label htmlFor={checkboxId} className="todo-item__text">
        {todo.text}
      </label>
      <button
        type="button"
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        ✕
      </button>
    </li>
  );
}
