import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Todo {
  todo: string;
  completed: boolean;
  id: number;
}

interface TodoContextType {
  todo: Todo[];
  setTodo: any;
  nextId: number;
  setNextId: any;
  filter: string;
  setFilter: any;
  searchQuery: string;
  setSearchQuery: any;
  undo: any;
  redo: any;
}

const defaultTodo = [
  { todo: "Brush Teeth", completed: true, id: 1 },
  { todo: "Buy Grocery", completed: true, id: 2 },
  { todo: "Pay Rent", completed: false, id: 3 },
];

function getLocalTodo() {
  try {
    const localTodo = localStorage.getItem("todo");
    if (localTodo) {
      return JSON.parse(localTodo);
    } else {
      return defaultTodo;
    }
  } catch (error) {
    console.log("Error: ", error);
    return defaultTodo;
  }
}

const defaultTodoContextValue: TodoContextType = {
  todo: getLocalTodo(),
  setTodo: () => {},
  nextId: 4,
  setNextId: () => {},
  filter: "All",
  setFilter: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  undo: () => {},
  redo: () => {},
};

const TodoContext = createContext<TodoContextType>(defaultTodoContextValue);

interface Props {
  children: ReactNode;
}

export const TodoProvider = ({ children }: Props) => {
  const [todo, setTodo] = useState<Todo[]>(defaultTodoContextValue.todo);
  const [nextId, setNextId] = useState<number>(defaultTodoContextValue.nextId);
  const [filter, setFilter] = useState<string>(defaultTodoContextValue.filter);
  const [searchQuery, setSearchQuery] = useState<string>(
    defaultTodoContextValue.searchQuery
  );
  const [undoStack, setUndoStack] = useState<Todo[][]>([]);
  const [redoStack, setRedoStack] = useState<Todo[][]>([]);

  function handleTodoChange(newTodo: Todo[]) {
    setUndoStack((prev) => [...prev, todo]);
    setRedoStack([]);
    setTodo(newTodo);
  }

  function undo() {
    if (undoStack.length > 0) {
      const previousTodo = undoStack[undoStack.length - 1];
      setRedoStack((prev) => [todo, ...prev]);
      setTodo(previousTodo);
      setUndoStack(undoStack.slice(0, undoStack.length - 1));
    }
  }

  function redo() {
    if (redoStack.length > 0) {
      const nextTodo = redoStack[0];
      setUndoStack((prev) => [...prev, todo]);
      setTodo(nextTodo);
      setRedoStack(redoStack.slice(1));
    }
  }

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo: handleTodoChange,
        nextId,
        setNextId,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        undo,
        redo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
