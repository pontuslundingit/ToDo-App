import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import styles from "./TodoItem.module.css";

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo, color }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [lastValidText, setLastValidText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      if (newText.trim() !== "") {
        editTodo(todo.id, newText);
        setLastValidText(newText);
      } else {
        setNewText(lastValidText);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setNewText(e.target.value);
  };

  const handleItemClick = (e) => {
    if (!e.target.closest("input, .editButton, .changeButton")) {
      toggleTodo(todo.id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (newText.trim() !== "") {
        editTodo(todo.id, newText);
        setLastValidText(newText);
      } else {
        setNewText(lastValidText);
      }
      setIsEditing(false);
    }
  };

  const handleChangeButtonClick = () => {
    if (newText.trim() === "") {
      setNewText(lastValidText);
    } else {
      editTodo(todo.id, newText);
      setLastValidText(newText);
    }
    setIsEditing(false);
  };


  const handleSave = () => {
    if (newText.trim() !== "") {
      editTodo(todo.id, newText);
      setLastValidText(newText);
    } else {
      setNewText(lastValidText);
    }
    setIsEditing(false);
  };
  
  return (
    <li
      className={`${styles.item} ${todo.completed ? styles.completed : ""}`}
      style={{ backgroundColor: color }}
      onClick={handleItemClick}
    >
      <span>
        {isEditing ? (
          <div className={styles.editContainer}>
            <input
              type="text"
              value={newText}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
              onBlur={() => handleSave()}
              
            />
            <button
              className={styles.changeButton}
              onClick={handleSave}
            >
              Change
            </button>
          </div>
        ) : (
          todo.text
        )}
      </span>
      <div className={styles.icons}>
        <FaEdit
          className={`editButton ${styles.editIcon}`}
          onClick={handleEdit}
        />
        <FaTrash
          className={`deleteButton ${styles.deleteIcon}`}
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
          }}
        />
      </div>
    </li>
  );
}

export default TodoItem;
