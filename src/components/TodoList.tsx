import { CrossIcon } from "../assets/icons";
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

  function deleteTodo(index: number) {
    setTodo((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      {todo.map((item, index) => (
        <div
          className={`border ${
            item.completed
              ? "border-green-300 bg-green-50"
              : "border-gray-300 bg-gray-50"
          } rounded-lg my-3 py-2 px-5 flex justify-between items-center`}
          key={index}
        >
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleStatus(index)}
              className="w-4 h-4 cursor-pointer accent-green-300"
            />
            <span>{item.todo}</span>
          </div>
          <button onClick={() => deleteTodo(index)}>
            <CrossIcon className="h-5 w-5 text-gray-400 hover:text-gray-700" />
          </button>
        </div>
      ))}
    </div>
  );
}
