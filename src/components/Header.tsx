import Filter from "./Filter";
import Search from "./Search";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-x-10 gap-y-3 mt-20 mb-10">
      <div className="text-2xl font-bold">Today</div>
      <Search />
      <Filter />
    </div>
  );
}
