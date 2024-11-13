import { useTodoContext } from "../context/TodoContext";
import { UndoIcon, RedoIcon } from "../assets/icons";

export default function UndoRedo() {
  const { undo, redo } = useTodoContext();

  return (
    <div className="flex gap-3 justify-end">
      <button onClick={undo} className="py-1 px-3 border rounded">
        <UndoIcon className="h-4 w-4" />
      </button>
      <button onClick={redo} className="py-1 px-3 border rounded">
        <RedoIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
