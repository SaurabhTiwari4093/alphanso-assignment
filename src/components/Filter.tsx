import { useTodoContext } from "../context/TodoContext";

const filterOptions = ["All", "Completed", "Incomplete"];

export default function Filter() {
  const { filter, setFilter } = useTodoContext();

  return (
    <div className="flex gap-3 text-white text-sm">
      {filterOptions.map((item) => {
        const active = item === filter;
        return (
          <button
            key={item}
            className={`${
              active ? "bg-green-500" : "bg-gray-400"
            } px-3 py-0.5 rounded`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
