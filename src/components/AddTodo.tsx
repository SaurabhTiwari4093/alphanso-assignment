import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

export default function AddTodo() {
  const { addTodo } = useTodoContext();
  const [todoItem, setTodoItem] = useState<string>("");

  const addTodoToList = () => {
    const trimItem = todoItem.trim();
    if (!trimItem) {
      alert("Empty task not allowed");
      return;
    }
    addTodo(trimItem);
    setTodoItem("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type something"
        className="border border-gray-300 py-2 px-5 w-full rounded-lg"
        value={todoItem}
        onChange={(e) => setTodoItem(e.target.value)}
      />
      <button
        className="py-2 px-5 rounded-lg bg-gray-900 text-white w-full text-center my-3"
        onClick={addTodoToList}
      >
        Add Task
      </button>
    </div>
  );
}
