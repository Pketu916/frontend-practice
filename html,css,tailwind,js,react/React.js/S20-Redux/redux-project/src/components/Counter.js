import { useSelector, useDispatch } from "react-redux"
import classes from './Counter.module.css';
import { counterActions } from "../store/counter";


const Counter = () => {
  // const counter = useSelector(state => state.counter)
  // const dispatch = useDispatch()
  // const show = useSelector(state => state.showCounter)

  // const incrementHandler = () => {
  //   dispatch({ type: "increment" })
  // }
  // const decrementHandler = () => {
  //   dispatch({ type: "decrement" })
  // }
  // const increaseHandler = () => {
  //   dispatch({ type: "increase", amount: 5 })
  // }

  // const toggleCounterHandler = () => { dispatch({ type: "toggle" }) };

  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter.counter)
  const show = useSelector(state => state.counter.showCounter)

  const incrementHandler = () => {
    dispatch(counterActions.increment())
  }
  const decrementHandler = () => {
    dispatch(counterActions.decrement())

  }
  const increaseHandler = () => {
    dispatch(counterActions.increase(5))
  }

  const toggleCounterHandler = () => { dispatch(counterActions.toggleCounter()) };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div className="counter">
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={incrementHandler}>Increment</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
