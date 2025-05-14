import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load task history from localStorage when the app starts
  useEffect(() => {
    const savedHistory = localStorage.getItem('taskHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('taskHistory', JSON.stringify(history));
  }, [history]);

  const addTask = () => {
    if (input.trim() === '') return;

    const newTask = {
      text: input,
      timestamp: new Date().toLocaleString(),
    };

    setTasks([...tasks, newTask]);

    // Add to history (persistent)
    const updatedHistory = [...history, newTask];
    setHistory(updatedHistory);
    localStorage.setItem('taskHistory', JSON.stringify(updatedHistory));

    setInput('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    // Note: history remains untouched
  };

  return (
    <div className="section">
      <div className="container">
        <h1>To-Do List</h1>

        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <label htmlFor="taskInput">Add Task</label>
          <div style={{ display: 'flex' }}>
            <input
              id="taskInput"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addTask}>Add</button>
          </div>
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          style={{
            background: 'black',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            marginBottom: '10px',
          }}
        >
          <FontAwesomeIcon icon={faClockRotateLeft} /> History
        </button>

        {showHistory && (
          <div
            style={{
              background: 'white',
              color: 'black',
              border: '2px solid black',
              padding: '10px',
              borderRadius: '10px',
              maxHeight: '150px',
              overflowY: 'auto',
              marginBottom: '20px',
            }}
          >
            <h4>Task History</h4>
            <ul style={{ padding: 0 }}>
              {history.length === 0 ? (
                <li style={{ background: 'none' }}>No history yet.</li>
              ) : (
                history.map((task, i) => (
                  <li key={i} style={{ fontSize: '12px', marginBottom: '5px' }}>
                    {task.text} <br />
                    <small style={{ color: 'gray' }}>{task.timestamp}</small>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task.text}</span>
              <button onClick={() => deleteTask(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
