import { SearchIcon } from "../assets/icons";

export default function Search() {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        className="w-full rounded-full border py-2 pl-10 pr-3"
        placeholder="Search"
      />
      <SearchIcon className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
    </div>
  );
}
