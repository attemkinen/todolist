import React, { useState } from "react"
import { AgGridReact } from 'ag-grid-react'
import'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css';




export default function Todolist() {
  const [todo, setTodo] = useState({
    description: "",
    date: "",
    priority:''
  });
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    setTodos([todo, ...todos]);
    setTodo({ description: "", date: "", priority: "" });
  };

  const columns = [
    {headername: 'Description', field: 'description', sortable: true },
    {headername: 'Date', field: 'date', sortable: true},
    {headername: 'Priority', field: 'priority', sortable: true},
  ]

  return (
    <div>
      <h1>Todolist</h1>
      <input
        placeholder="Description"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <input
        type="date"
        value={todo.date}
        onChange={(e) => setTodo({ ...todo, date: e.target.value })}
      />
       <input
        placeholder="Priority"
        value={todo.priority}
        onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
      />
      

      <button onClick={handleAddTodo}>Add Todo</button>

      <div className="ag-theme-material"
        style={{height: '700px', width: '70%', margin: 'auto'}} >
        <AgGridReact
        columnDefs={columns}
        rowData={todos}>
        </AgGridReact>
      </div>
      
    </div>
  );
}
