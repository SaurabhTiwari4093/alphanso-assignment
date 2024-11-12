import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full p-5">
        <Header />
        <TodoList />
        <AddTodo />
      </div>
    </div>
  );
}
