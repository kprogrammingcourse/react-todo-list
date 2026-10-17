# To-Do List

A task manager built with React and Vite. Add, complete, filter, and delete tasks; your tasks and filter are saved in the browser and survive page refreshes. Covered by unit and integration tests.

**Live demo:** _(your deployed link)_

## Features

- Add tasks (Enter or button), with validation for empty input
- Mark tasks complete or incomplete; click the text or the checkbox
- Delete individual tasks or clear all completed tasks
- Filter: All / Active / Completed, with filter-specific empty states
- **Persistence:** tasks and selected filter saved to `localStorage`
- **Resilient:** corrupted or unavailable storage never crashes the app
- Live "tasks left" counter in the page and the browser tab title
- Accessible: labeled inputs, announced errors, visible focus, keyboard support
- Responsive layout

## Tech Stack

- [React](https://react.dev) (`useState`, `useEffect`, custom hooks)
- [Vite](https://vite.dev)
- [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) + user-event
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

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the development server         |
| `npm run build`    | Build for production into `dist/`    |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Check code quality with ESLint       |
| `npm test`         | Run tests in watch mode              |
| `npm run test:run` | Run all tests once                   |

## Project Structure

```text
src/
├── components/
│   ├── TodoFilters.jsx         # All / Active / Completed buttons
│   ├── TodoForm.jsx            # Controlled input with validation
│   ├── TodoItem.jsx            # One task: checkbox, text, delete
│   └── TodoList.jsx            # Renders tasks or an empty message
├── hooks/
│   └── useLocalStorage.js      # useState that persists to localStorage
├── tests/
│   ├── App.test.jsx            # Integration tests (user-level behavior)
│   ├── filterTodos.test.js     # Unit tests for filtering
│   ├── setup.js                # Test environment setup and cleanup
│   └── useLocalStorage.test.js # Unit tests for the custom hook
├── utils/
│   └── filterTodos.js          # Pure filtering function
├── App.jsx                     # Shared state and handlers
├── App.css                     # Component styles
├── index.css                   # Global styles and utilities
└── main.jsx                    # Entry point
```

## Architecture Notes

- **State is lifted** to `App` because several components need the task list.
- **Persistence is isolated** in a reusable `useLocalStorage` hook; components are unaware of where data is stored.
- **Lazy initial state** reads storage once on startup; an **effect** writes on every change.
- **Updates are immutable** (`map`, `filter`, spread) so React reliably re-renders.
- **Filtered tasks and counts are derived** on each render, never stored separately.
- **Stable IDs** (`crypto.randomUUID()`) are used as list keys.

## Testing

Tests focus on behavior a user can observe, querying elements by role, label, and visible text rather than implementation details.

- **Unit tests:** the filtering function and the storage hook, including corrupted-data handling
- **Integration tests:** adding, validating, completing, deleting, filtering, and persisting tasks across a simulated reload

```bash
npm run test:run
```

## What I Learned

- Synchronizing React state with browser APIs using `useEffect`
- Writing a reusable custom hook and lazy initial state
- Defensive handling of external data with `try/catch`
- Writing unit and integration tests with Vitest and React Testing Library
- Working on a feature branch and merging through a pull request
