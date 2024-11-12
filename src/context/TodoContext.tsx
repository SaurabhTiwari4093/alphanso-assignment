import { createContext, useContext, useState, ReactNode } from "react";

interface Todo {
  todo: string;
  completed: boolean;
}

interface TodoContextType {
  todo: Todo[];
  setTodo: any;
}

const defaultTodoContextValue: TodoContextType = {
  todo: [
    { todo: "Brush Teeth", completed: true },
    { todo: "Buy Grocery", completed: true },
    { todo: "Pay Rent", completed: false },
  ],
  setTodo: () => {},
};

const TodoContext = createContext<TodoContextType>(defaultTodoContextValue);

interface Props {
  children: ReactNode;
}

export const TodoProvider = ({ children }: Props) => {
  const [todo, setTodo] = useState<Todo[]>(defaultTodoContextValue.todo);

  return (
    <TodoContext.Provider value={{ todo, setTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
