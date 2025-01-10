import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import TextUpForm from './components/TextUpForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === 'light') {
      setMode("dark");
      document.body.style.backgroundColor = "gray";
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = "white";

    }
  }

  return (
    <Router>
      <div className="App">
        <Navbar mode={mode} toggleMode={toggleMode} />
        <Switch >
          <Route path='/TextUpForm'>
            <TextUpForm mode={mode} />
          </Route>
          <Route path='/about'>
            <About mode={mode} />
          </Route>
        </Switch>

      </div>
    </Router>

  );
}

export default App;
