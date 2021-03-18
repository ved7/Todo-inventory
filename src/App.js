import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import "./style.css";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }
  

  return (
    <>
      <h1 className="heading">TO`DO  LIST</h1>
      <div className="wrapper">
      <input ref={todoNameRef} label="Task"type="text" placeholder="  Type your task here.." />
      </div> 
      
      <div className="container">
        <button className="btn btn1" onClick={handleAddTodo}>
          Add Todo
        </button>
        <button className="btn btn2" onClick={handleClearTodos}>
          Clear Complete
        </button>
      </div>


      <div className="list">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
      <div className="lastText">
        {todos.filter((todo) => !todo.complete).length} task left
      </div>
    </>
  );
}

export default App;
