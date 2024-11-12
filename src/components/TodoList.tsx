import { useTodoContext } from "../context/TodoContext";

export default function TodoList() {
  const { todo, setTodo } = useTodoContext();

  function toggleStatus(index: number) {
    setTodo((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <div>
      {todo.map((item, index) => (
        <div
          className={`border ${
            item.completed
              ? "border-green-300 bg-green-50"
              : "border-gray-300 bg-gray-50"
          } rounded-lg my-3 py-2 px-5`}
          key={index}
        >
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleStatus(index)}
          />
          <span>{item.todo}</span>
        </div>
      ))}
    </div>
  );
}
