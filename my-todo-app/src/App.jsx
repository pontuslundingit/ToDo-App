

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F4D03F", "#FF30C1"];

  const addTodo = (text) => {
    const newTodo = { 
      id: Date.now(), 
      text, 
      completed: false, 
      color: colors[todos.length % colors.length], };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <Header/>
      <TodoForm addTodo={addTodo} />
      <TodoList 
      todos={todos} 
      toggleTodo={toggleTodo} 
      deleteTodo={deleteTodo}
      editTodo={editTodo}
       />
    </div>
  );
}

export default App;
