const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function TodoFilters({ currentFilter, onFilterChange }) {
  return (
    <div className="todo-filters" role="group" aria-label="Filter tasks">
      {FILTER_OPTIONS.map((option) => {
        const isActive = option.value === currentFilter;

        return (
          <button
            key={option.value}
            type="button"
            className={
              isActive
                ? "todo-filters__button todo-filters__button--active"
                : "todo-filters__button"
            }
            onClick={() => onFilterChange(option.value)}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
