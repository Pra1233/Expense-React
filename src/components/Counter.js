import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux"; //access to store
import { counterActions } from "../store/counter";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter); //subscription automatically
  const showCounter = useSelector((state) => state.counter.showCounter);

  const toggleCounterHandler = () => {
    // dispatch({ type: "toggle" });
    dispatch(counterActions.toggleCounter());
  };

  const Increment = () => {
    dispatch(counterActions.increment());
  };
  const Decrement = () => {
    dispatch(counterActions.decrease(1)); //{type:'unique id',payload:1}
  };

  const IncrementFive = () => {
    dispatch(counterActions.increase(5));
  };

  const DecrementFive = () => {
    dispatch(counterActions.decrease(5));
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={Increment}>+</button>
        <button onClick={Decrement}>-</button>
        <button onClick={IncrementFive}>+5</button>
        <button onClick={DecrementFive}>-5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
