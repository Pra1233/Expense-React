const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  //input -oldstate + dispathed action
  //output- //new state( object)
  //it should be pure function same input lead to same output so dont do fetch,localstorage

  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  } else if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
};
const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState(); //latest state snapshot
  console.log(latestState); //whenever state changes i want to call
};
store.subscribe(counterSubscriber);

store.dispatch({ type: "increment" }); //action dispatch caused reducer function to run again
store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });

store.dispatch({ type: "decrement" });
store.dispatch({ type: "decrement" });
