import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';

function App() {
  
  const [mode , setMode] = useState("dark");

  const toggleMode = ()=>{
    if (mode === 'light'){
      setMode("dark");
      document.body.style.backgroundColor = "gray";
    } 
    else {
      setMode("light");
      document.body.style.backgroundColor = "light";

    }
  }

  return (
    <div className="App">
        <Navbar mode= {mode} toggleMode= {toggleMode} />
        <About mode= {mode}  />
    </div>
  );
}

export default App;
