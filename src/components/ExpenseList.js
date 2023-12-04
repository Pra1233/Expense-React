import React from "react";

const ExpenseList = (props) => {
  return (
    <div>
      {props.expenses.map((e) => (
        // console.log(e[1], "33");
        <div key={e[0]}>
          <h2>Amount: {e[1].amount}</h2>
          <p>Description: {e[1].description}</p>
          <p>Category: {e[1].category}</p>
          <button onClick={() => props.onEdit(e[0], e[1])}>Edit</button>
          <button onClick={() => props.onDelete(e[0])}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
