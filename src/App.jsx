import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (task.trim() === "") return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="app">
      <div className="hero-photo" aria-hidden="true" />
      <div className="todo-container">
        <div className="header-section">
          <h1>🎯 My Todo List</h1>
          <p className="subtitle">Do it when you are alive,Can't Reborn Again!!</p>
        </div>

        <div className="divider"></div>

        <div className="form-section">
          <div className="input-wrapper">
            <span className="input-icon">✏️</span>
            <input
              type="text"
              placeholder="Add a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="task-input"
            />
          </div>

          <button onClick={addTodo} className="add-btn">
            <span className="btn-icon">➕</span>
            <span className="btn-text">Add</span>
          </button>
        </div>

        <div className="list-section">
          <div className="list-header">
            <h2>Tasks ({todos.length})</h2>
          </div>

          <div className="todo-list">
            {todos.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🎯</span>
                <p className="empty-msg">No tasks yet!</p>
                <p className="empty-submsg">Let's Make it happen!</p>
              </div>
            ) : (
              todos.map((todo, index) => (
                <div key={todo.id}>
                  <div className="todo-card">
                    <div className="todo-content">
                      <button
                        className={`checkbox ${todo.completed ? "checked" : ""}`}
                        onClick={() => toggleComplete(todo.id)}
                        aria-label="Toggle task completion"
                      >
                        {todo.completed ? "✓" : ""}
                      </button>
                      <span
                        className={`todo-text ${todo.completed ? "completed" : ""}`}
                        onClick={() => toggleComplete(todo.id)}
                      >
                        {todo.text}
                      </span>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label="Delete task"
                    >
                      🗑️
                    </button>
                  </div>
                  {index < todos.length - 1 && <div className="todo-divider"></div>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;