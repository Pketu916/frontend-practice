import { useContext } from "react";
import Component1 from "./Component1";
import { counterContext } from "../context/context";

const Button = () => {

    const value = useContext(counterContext)

  const handleCount = () => {
    value.setCount((prev) => prev + 1);
  };

  return (
    <div>
      <button onClick={handleCount}>
        <span>
          <Component1 />
        </span>
        i am button
      </button>
    </div>
  );
};

export default Button;
