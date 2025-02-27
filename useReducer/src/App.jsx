import { useReducer } from "react";
import "./App.css";

const reducer = (state, action) => {
  if (action.type === "increment") {
    return { ...state, count: state.count + 1 };
  } else if (action.type === "decrement") {
    return { ...state, count: state.count - 1 };
  } else if (action.type === "reset") {
    return {...state,count:0};
  }
};

function App() {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <h1>Vite + React</h1>
      <h1>{state.count}</h1>
      <div className="card">
        <button onClick={() => dispatch({ type: "increment" })}>
          increment
        </button>
        <button onClick={() => dispatch({ type: "reset" })}>reset</button>
        <button onClick={() => dispatch({ type: "decrement" })}>
          decrement
        </button>
      </div>
    </>
  );
}

export default App;
