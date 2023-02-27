import React, { useState } from 'react';

export default function Todolist() {
  const [todo, setTodo] = useState({
    description: '',
    date: ''
  });
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    setTodos([todo, ...todos]);
    setTodo({description: '', date: ''});
  }

  const handleDeleteTodo =(row) => {
    setTodos(todos.filter((todo, index) => row !==index ));

  }

  return(
    <div>
      <h1>My Todos</h1>
      <input
        placeholder='Description'
        value={todo.description}
        onChange={e => setTodo({...todo, description: e.target.value})}
      />
      <input
        type="date"
        value={todo.date}
        onChange={e => setTodo({...todo, date: e.target.value})}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <table>
        <tbody>
          {
            todos.map((todo, index) => 
              <tr key={index}>
                <td>{todo.description}</td>
                <td>{todo.date}</td>
                <td><button onClick={()=>handleDeleteTodo(index)}>delete</button></td>
              </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}