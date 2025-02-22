import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./styles.css"; // Create this file for animations

function TaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
      status
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <div className="form-group">
          <label>Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="form-group">
          <label>Created:</label>
          <input
            type="text"
            readOnly
            value={new Date(task.timestamp).toLocaleString()}
          />
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Task({ task, index, onDelete, onEdit, onMove }) {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "TASK",
      item: { id: task._id, index, status: task.status },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
  
    const [, drop] = useDrop({
      accept: "TASK",
      hover: (draggedItem) => {
        if (draggedItem.id === task._id || draggedItem.status !== task.status) return;
        onMove(draggedItem.id, task._id);
      },
    });
  
    return (
      <div
        ref={(node) => drag(drop(node))}
        style={{
          opacity: isDragging ? 0.5 : 1,
          background: "white",
          padding: "10px",
          margin: "5px 0",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <span className="task-title" onClick={() => onEdit(task)}>
          {task.title}
        </span>
        <button className="delete-button" onClick={() => onDelete(task._id)}>
          ×
        </button>
      </div>
    );
  }
  
  function Section({ title, status, tasks, onMoveTask, onDelete, onEdit, onReorder }) {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "TASK",
      drop: (item) => {
        if (item.status !== status) onMoveTask(item.id, status);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  
    const handleMove = (draggedId, hoverId) => {
      const draggedIndex = tasks.findIndex(t => t._id === draggedId);
      const hoverIndex = tasks.findIndex(t => t._id === hoverId);
      if (draggedIndex === hoverIndex) return;
  
      const reordered = [...tasks];
      const [removed] = reordered.splice(draggedIndex, 1);
      reordered.splice(hoverIndex, 0, removed);
      onReorder(status, reordered.map(t => t._id));
    };
  
    return (
      <div
        ref={drop}
        style={{
          background: isOver ? "#d0f0c0" : "#f4f4f4",
          padding: "15px",
          borderRadius: "10px",
          width: "250px",
          minHeight: "200px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>{title}</h2>
        {tasks.sort((a, b) => a.position - b.position).map((task) => (
          <Task
            key={task._id}
            task={task}
            index={task.position}
            onDelete={onDelete}
            onEdit={onEdit}
            onMove={handleMove}
          />
        ))}
      </div>
    );
  }
export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get("http://localhost:5000/data").then((res) => setTasks(res.data));
  };

  const addTask = () => {
    if (!title.trim()) return;
    axios
      .post("http://localhost:5000/tasks", {
        title,
        description: "",
        status: "todo",
      })
      .then(fetchTasks);
    setTitle("");
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/data/${id}`).then(fetchTasks);
  };

  const moveTask = (id, newStatus) => {
    axios.put(`http://localhost:5000/data/${id}`, { status: newStatus })
         .then(fetchTasks);
  };

  const updateTask = (updatedTask) => {
    axios.put(`http://localhost:5000/modal/${updatedTask._id}`, updatedTask)
         .then(fetchTasks);
  };

  const handleReorder = async (status, taskIds) => {
    try {
      // Optimistic update
      setTasks(prev => prev.map(task => {
        const newPosition = taskIds.indexOf(task._id);
        return newPosition !== -1 ? { ...task, position: newPosition } : task;
      }));
  
      await axios.put("http://localhost:5000/tasks/reorder", { 
        status,
        taskIds 
      });
    } catch (err) {
      fetchTasks(); // Rollback on error
    }
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div style={containerStyle}>
        <h1>Task Manager</h1>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            maxLength={50}
            style={inputStyle}
          />
          <button onClick={addTask} style={buttonStyle}>
            Add Task
          </button>
        </div>
        <div style={boardStyle}>
          <Section
            title="To Do"
            status="todo"
            tasks={tasks.filter((t) => t.status === "todo")}
            onMoveTask={moveTask}
            onDelete={deleteTask}
            onEdit={(task) => {
              setSelectedTask(task);
              setIsModalOpen(true);
            }}
            onReorder={handleReorder}
          />
          <Section
            title="In Progress"
            status="inprogress"
            tasks={tasks.filter((t) => t.status === "inprogress")}
            onMoveTask={moveTask}
            onDelete={deleteTask}
            onEdit={(task) => {
              setSelectedTask(task);
              setIsModalOpen(true);
            }}
            onReorder={handleReorder}
          />
          <Section
            title="Done"
            status="done"
            tasks={tasks.filter((t) => t.status === "done")}
            onMoveTask={moveTask}
            onDelete={deleteTask}
            onEdit={(task) => {
              setSelectedTask(task);
              setIsModalOpen(true);
            }}
            onReorder={handleReorder}
          />
        </div>
        {isModalOpen && (
          <TaskModal
            task={selectedTask}
            onClose={() => setIsModalOpen(false)}
            onSave={(updatedTask) => {
              updateTask(updatedTask);
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </DndProvider>
  );
}

// Add these styles to your CSS file
// styles.css

// Keep existing styles from original code
// Add button and input styles as needed
// Styles
const containerStyle = {
  maxWidth: "800px",
  margin: "auto",
  textAlign: "center",
};

const boardStyle = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginTop: "20px",
};

const inputStyle = {
  padding: "10px",
  width: "200px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle = {
  padding: "10px",
  border: "none",
  background: "#007bff",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};