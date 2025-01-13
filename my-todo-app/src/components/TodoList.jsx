import React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  return (
    <ul className={styles.list}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          color={todo.color}
        />
      ))}
    </ul>
  );
}

export default TodoList;
