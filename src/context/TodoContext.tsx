import { createContext, useContext, useState, ReactNode } from "react";

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
}

const defaultTodoContextValue: TodoContextType = {
  todo: [
    { todo: "Brush Teeth", completed: true, id: 1 },
    { todo: "Buy Grocery", completed: true, id: 2 },
    { todo: "Pay Rent", completed: false, id: 3 },
  ],
  setTodo: () => {},
  nextId: 4,
  setNextId: () => {},
};

const TodoContext = createContext<TodoContextType>(defaultTodoContextValue);

interface Props {
  children: ReactNode;
}

export const TodoProvider = ({ children }: Props) => {
  const [todo, setTodo] = useState<Todo[]>(defaultTodoContextValue.todo);
  const [nextId, setNextId] = useState<number>(defaultTodoContextValue.nextId);

  return (
    <TodoContext.Provider value={{ todo, setTodo, nextId, setNextId }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
