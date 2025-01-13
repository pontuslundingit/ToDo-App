import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import styles from "./TodoItem.module.css";

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo, color }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [lastValidText, setLastValidText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      // Om texten inte är tom, spara ändringen och uppdatera den senaste giltiga texten
      if (newText.trim() !== "") {
        editTodo(todo.id, newText);
        setLastValidText(newText); // Uppdatera senaste giltiga texten
      } else {
        // Återställ till senaste giltiga text om den nuvarande texten är tom
        setNewText(lastValidText);
      }
    }
    setIsEditing(!isEditing); // Växla redigeringsläge
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
        setLastValidText(newText); // Uppdatera senaste giltiga texten
      } else {
        setNewText(lastValidText); // Återställ till senaste giltiga text om den nuvarande texten är tom
      }
      setIsEditing(false);
    }
  };

  const handleChangeButtonClick = () => {
    // Kolla om texten är tom och återställ den i så fall till senaste giltiga text
    if (newText.trim() === "") {
      setNewText(lastValidText); // Återställ till senaste giltiga text
    } else {
      editTodo(todo.id, newText);
      setLastValidText(newText); // Uppdatera senaste giltiga texten
    }
    setIsEditing(false); // Växla ut ur redigeringsläge
  };


  const handleSave = () => {
    if (newText.trim() !== "") {
      editTodo(todo.id, newText); // Spara den nya texten
      setLastValidText(newText); // Uppdatera senaste giltiga texten
    } else {
      setNewText(lastValidText); // Återställ till senaste giltiga text om den nuvarande texten är tom
    }
    setIsEditing(false); // Stäng redigeringsläge
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
              onKeyDown={handleKeyDown} // Lägg till eventlyssnare för Enter
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
            e.stopPropagation(); // Förhindra att delete triggar completed-funktionen
            deleteTodo(todo.id); // Radera ToDo:n
          }}
        />
      </div>
    </li>
  );
}

export default TodoItem;
