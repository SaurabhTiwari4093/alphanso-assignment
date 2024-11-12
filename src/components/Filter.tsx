interface Props {
  title: string;
  active?: boolean;
}

function FilterButton({ title, active = false }: Props) {
  return (
    <button
      className={`${
        active ? "bg-green-500" : "bg-gray-400"
      } px-3 py-0.5 rounded`}
    >
      {title}
    </button>
  );
}

export default function Filter() {
  return (
    <div className="flex gap-3 text-white text-sm">
      <FilterButton title="All" active={true} />
      <FilterButton title="Completed" />
      <FilterButton title="Incomplete" />
    </div>
  );
}
