import React from "react";
import classes from "./Operators.module.css";

const Operators = (props) => {
  const operatorButtons = ["÷", "×", "-", "+", "="];

  const operatorButtonsOutput = operatorButtons.map((button) => {
    let operation = props.onNewOperator;
    if (button === "=") {
      operation = props.onCalcSolution;
    }

    return (
      <button
        onClick={operation}
        value={button}
        key={button}
        className={classes.OperatorButton}
      >
        {button}
      </button>
    );
  });

  return <div>{operatorButtonsOutput}</div>;
};

export default Operators;
