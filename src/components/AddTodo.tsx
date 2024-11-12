export default function AddTodo() {
  return (
    <div>
      <input
        placeholder="Type something"
        className="border border-gray-300 py-2 px-5 w-full rounded-lg"
      />
      <button className="py-2 px-5 rounded-lg bg-gray-900 text-white w-full text-center my-3">
        Add Task
      </button>
    </div>
  );
}
