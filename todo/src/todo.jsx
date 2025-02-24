import React, { useState } from 'react';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");  
  const [editingIndex, setEditingIndex] = useState(null);  
  const [editedTask, setEditedTask] = useState("");  

  const addTask = () => {
    if (newTask.trim() === "") return;  
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask(""); 
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const saveEditedTask = () => {
    if (editedTask.trim() === "") return;
    const updatedTasks = tasks.map((task, index) =>
      index === editingIndex ? { ...task, text: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedTask("");
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Todo App</h1>
      
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={saveEditedTask}>Save</button>
                <button onClick={() => setEditingIndex(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span onClick={() => toggleCompletion(index)}>{task.text}</span>
                <button onClick={() => deleteTask(index)}>Delete</button>
                <button onClick={() => editTask(index)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
