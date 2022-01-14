import logo from './logo.svg';
import './App.css';
import { Choice } from './components/core/Choice';
import { Outlet } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Choice />

      <Outlet />
    </div>
  );
}

export default App;
