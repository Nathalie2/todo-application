import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importing the App.css file

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks').then((response) => setTasks(response.data));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) {
      // Show an alert if the input is empty or only whitespace
      window.alert('Please enter a task before adding!');
      return;
    }

    axios.post('http://localhost:5000/api/tasks', { title: newTask }).then((response) => {
      setTasks([...tasks, response.data]);
      setNewTask('');
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  const toggleComplete = (task) => {
    axios.put(`http://localhost:5000/api/tasks/${task._id}`, { ...task, completed: !task.completed }).then((response) => {
      setTasks(tasks.map((t) => (t._id === response.data._id ? response.data : t)));
    });
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              className={task.completed ? 'completed' : ''}
              onClick={() => toggleComplete(task)}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <footer>
        <p>
          Learn more about the REST API or test it with Postman:
          <a
            href="http://localhost:5000/api/tasks"
            target="_blank"
            rel="noopener noreferrer"
          >
            REST API Documentation
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;

