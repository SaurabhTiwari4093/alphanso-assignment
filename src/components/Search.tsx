import { useEffect, useState } from "react";
import { SearchIcon } from "../assets/icons";
import { useTodoContext } from "../context/TodoContext";

export default function Search() {
  const { setSearchQuery } = useTodoContext();
  const [localQuery, setLocalQuery] = useState<string>("");

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmedQuery = localQuery.trim();
      setSearchQuery(trimmedQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery]);

  return (
    <div className="relative flex-1">
      <input
        type="text"
        className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-3"
        placeholder="Search"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <SearchIcon className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
    </div>
  );
}
