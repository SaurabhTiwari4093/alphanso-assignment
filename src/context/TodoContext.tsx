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
  addTodo: (todoItem: string) => void;
  deleteTodo: (itemId: number) => void;
  toggleStatus: (itemId: number) => void;
  filter: string;
  setFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  undo: () => void;
  redo: () => void;
}

const defaultTodo: Todo[] = [
  { todo: "Brush Teeth", completed: true, id: 1 },
  { todo: "Buy Grocery", completed: true, id: 2 },
  { todo: "Pay Rent", completed: false, id: 3 },
];

function getLocalTodo(): Todo[] {
  try {
    const localTodo = localStorage.getItem("todo");
    return localTodo ? JSON.parse(localTodo) : defaultTodo;
  } catch (error) {
    console.error("Error loading todos from localStorage:", error);
    return defaultTodo;
  }
}

const defaultContextValue: TodoContextType = {
  todo: getLocalTodo(),
  addTodo: () => {},
  deleteTodo: () => {},
  toggleStatus: () => {},
  filter: "All",
  setFilter: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  undo: () => {},
  redo: () => {},
};

const TodoContext = createContext<TodoContextType>(defaultContextValue);

interface Props {
  children: ReactNode;
}

export const TodoProvider = ({ children }: Props) => {
  const [todo, setTodo] = useState<Todo[]>(defaultContextValue.todo);
  const [nextId, setNextId] = useState<number>(4);
  const [filter, setFilter] = useState<string>(defaultContextValue.filter);
  const [searchQuery, setSearchQuery] = useState<string>(
    defaultContextValue.searchQuery
  );
  const [undoStack, setUndoStack] = useState<Todo[][]>([]);
  const [redoStack, setRedoStack] = useState<Todo[][]>([]);

  function handleTodoChange(newTodo: Todo[]) {
    setUndoStack((prev) => [...prev, todo]);
    setRedoStack([]);
    setTodo(newTodo);
  }

  const addTodo = (todoItem: string) => {
    const newTodo = [...todo, { todo: todoItem, completed: false, id: nextId }];
    handleTodoChange(newTodo);
    setNextId((prev) => prev + 1);
  };

  const deleteTodo = (itemId: number) => {
    const newTodo = todo.filter((item) => item.id !== itemId);
    handleTodoChange(newTodo);
  };

  const toggleStatus = (itemId: number) => {
    const newTodo = todo.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    handleTodoChange(newTodo);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const previousTodo = undoStack[undoStack.length - 1];
      setRedoStack((prev) => [todo, ...prev]);
      setTodo(previousTodo);
      setUndoStack(undoStack.slice(0, undoStack.length - 1));
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextTodo = redoStack[0];
      setUndoStack((prev) => [...prev, todo]);
      setTodo(nextTodo);
      setRedoStack(redoStack.slice(1));
    }
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <TodoContext.Provider
      value={{
        todo,
        addTodo,
        deleteTodo,
        toggleStatus,
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
