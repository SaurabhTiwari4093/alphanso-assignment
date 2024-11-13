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

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        nextId,
        setNextId,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
