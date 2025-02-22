import React, { useState } from "react";
import { useDrag } from "react-dnd";
import TaskModal from "./taskmodal"; // Import modal

function Task({ task, onDelete, onMove, onUpdate }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        ref={drag}
        onClick={() => setModalOpen(true)}
        style={{
          opacity: isDragging ? 0.5 : 1,
          background: "white",
          padding: "10px",
          margin: "5px 0",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        {task.title}
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          task={task}
          onClose={() => setModalOpen(false)}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

export default Task;
