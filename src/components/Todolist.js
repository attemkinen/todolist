import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import 'dayjs/locale/fi';





export default function Todolist() {
    const [todo, setTodo] = useState({
        description: '',
        date: dayjs(new Date()),
        priority: ''
    });

    const [todos, setTodos] = useState([]);

    const gridRef = useRef();


    const columns = [
        { field: "description", sortable: true, filter: true, floatingFilter: true },
        { field: "date", sortable: true, filter: true, floatingFilter: true },
        { field: "priority", sortable: true, filter: true, floatingFilter: true, cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' } }
    ];


   

    const addTodo = (event) => {
        event.preventDefault();
        const newTodo = {...todo, date: todo.date.format("DD.MM.YYYY")};
        setTodos([...todos, newTodo]);
        setTodo({ description: '', date: '', priority: '' });
    }
    const handleDateChange = (date) => {
        
        setTodo({ ...todo, date: date });
      }

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index !== gridRef.current.getSelectedNodes()[0].childIndex))
        }
        else {
            alert('Select row first');
        }
    }
return (
        <div>
            
            
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <TextField
                    label="Description"
                    variant="standard"
                    name="desc" value={todo.description}
                    onChange={e => setTodo({ ...todo, description: e.target.value })} />
                <LocalizationProvider dateAdapter={AdapterDayjs}adapterLocale="fi">
                    {<DatePicker
                        label="Date"
                        format="DD-MM-YYYY"
                        value={todo.date}
                        onChange={handleDateChange}
                    />}
                </LocalizationProvider>
                <TextField
                    label='Priority'
                    variant="standard"
                    name="priority" value={todo.priority}
                    onChange={e => setTodo({ ...todo, priority: e.target.value })} />
                <Button onClick={addTodo} variant="contained">Add</Button>
                <Button onClick={deleteTodo} variant="contained">Delete</Button>
            </Stack>

            <div className="ag-theme-material"
                style={{ height: '700px', width: '70%', margin: 'auto' }} >
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    columnDefs={columns}
                    rowData={todos}
                    animateRows={true}>
                </AgGridReact>
            </div>

        </div>
    );
}

