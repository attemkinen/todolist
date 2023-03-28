
import Todolist from './components/Todolist';

import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
  } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
<Link to="/">Home</Link>{' '}
<Link to="/todolist">Todolist</Link>{' '}

<Routes>
<Route exact path="/" element={<Home />} />
<Route path="/todolist" element={<Todolist/>} />
</Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
