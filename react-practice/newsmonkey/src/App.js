import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import About from './components/About';
import Spinner from './components/Spinner';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<News pageSize={5} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
