import { useContext } from "react";
import { counterContext } from "../context/context";

const Component1 = () => {
  const { count, setCount } = useContext(counterContext);
  return <div>{count}</div>;
};

export default Component1;
