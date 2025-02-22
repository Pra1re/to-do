import React, { useState } from "react";
import axios from "axios";
import "..components/taskmodal.css";

function TaskModal({ task, onClose, onUpdate, onDelete }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/tasks/${task._id}`, {
        title,
        description,
      });
      onUpdate(); // Refetch tasks after saving
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <input
          type="text"
          value={title}
          maxLength="50"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <textarea
          value={description}
          maxLength="200"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
