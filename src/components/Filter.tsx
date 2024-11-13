import { useEffect, useState } from "react";
import { useTodoContext } from "../context/TodoContext";

const filterOptions = ["All", "Completed", "Incomplete"];

export default function Filter() {
  const [selectedFilter, setSelectedFilter] = useState<string>(
    filterOptions[0]
  );
  const { setTodo } = useTodoContext();

  useEffect(() => {
    if (selectedFilter === "Completed") {
      setTodo((prev) => prev.filter((item) => item.completed));
    } else if (selectedFilter === "Incomplete") {
      setTodo((prev) => prev.filter((item) => !item.completed));
    } else {
    }
  }, [selectedFilter]);

  return (
    <div className="flex gap-3 text-white text-sm">
      {filterOptions.map((item) => {
        const active = item === selectedFilter;
        return (
          <button
            key={item}
            className={`${
              active ? "bg-green-500" : "bg-gray-400"
            } px-3 py-0.5 rounded`}
            onClick={() => setSelectedFilter(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
