import React, { useRef, useState } from "react"
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
  const gridRef = useRef();

  const handleAddTodo = () => {
    setTodos([todo, ...todos]);
    setTodo({ description: "", date: "", priority: "" });
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
    setTodos(todos.filter((todo, index) =>
    index !== gridRef.current.getSelectedNodes()[0].childIndex))
    }
    else {
    alert('No rows selected if you wish to continue SELECT ROW');
    }
    }

  const columns = [
    {headername: 'Description',
     field: 'description',
      sortable: true ,
       filter: true, 
       floatingFilter: true,
        animateRows:true},

    {headername: 'Date',
     field: 'date',
      sortable: true,
       filter: true,
        floatingFilter: true,
         animateRows:true},

    {headername: 'Priority',
     field: 'priority',
      sortable: true,
       filter: true,
        floatingFilter: true,
         animateRows:true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} 

  },
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
      <button onClick={deleteTodo}>Delete</button>

      <div className="ag-theme-material"
        style={{height: '700px', width: '70%', margin: 'auto'}} >
        <AgGridReact
        ref ={gridRef}
        onGridReady={ params => gridRef.current = params.api }
        rowSelection="single"
        columnDefs={columns}
        rowData={todos}>
        </AgGridReact>
      </div>
      
    </div>
  );
}
