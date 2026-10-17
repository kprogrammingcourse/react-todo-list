# To-Do List

A task manager built with React and Vite. Add, complete, filter, and delete tasks, with input validation and keyboard accessibility.

**Live demo:** _(add your deployed link after deployment)_

## Features

- Add tasks (Enter or button), with validation for empty input
- Mark tasks complete or incomplete; click the text or the checkbox
- Delete individual tasks or clear all completed tasks
- Filter: All / Active / Completed, with filter-specific empty states
- Live "tasks left" counter
- Accessible: labeled inputs, announced errors, visible focus, keyboard support
- Responsive layout

## Tech Stack

- [React](https://react.dev) (`useState`, lists and keys, controlled inputs)
- [Vite](https://vite.dev)
- CSS
- ESLint

## Getting Started

```bash
git clone https://github.com/YOUR-USERNAME/react-todo-list.git
cd react-todo-list
npm install
npm run dev
```

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build for production into `dist/`    |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Check code quality with ESLint       |

## Project Structure

```text
src/
├── components/
│   ├── TodoFilters.jsx  # All / Active / Completed buttons
│   ├── TodoForm.jsx     # Controlled input with validation
│   ├── TodoItem.jsx     # One task: checkbox, text, delete
│   └── TodoList.jsx     # Renders tasks or an empty message
├── App.jsx              # Shared state (todos, filter) and handlers
├── App.css              # Component styles
├── index.css            # Global styles and utilities
└── main.jsx             # Entry point
```

## Architecture Notes

- **State is lifted** to `App` because several components need the task list.
- **Updates are immutable** (`map`, `filter`, spread) so React reliably re-renders.
- **Filtered tasks and counts are derived** on each render, never stored separately.
- **Stable IDs** (`crypto.randomUUID()`) are used as list keys instead of array indexes.

## Known Limitations

- Tasks are stored in memory and reset on page refresh (persistence planned next).

## What I Learned

- Rendering lists with `.map()` and why stable keys matter
- Building controlled forms and validating input
- Updating arrays of objects immutably
- Lifting state up and passing callbacks through props
- Deriving data instead of duplicating state
