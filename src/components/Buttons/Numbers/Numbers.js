import React from "react";
import classes from "./Numbers.module.css";

const Numbers = (props) => {
  const numberButtons = [];
  for (var i = 0; i < 10; i++) {
    numberButtons.push(i);
  }

  const numberButtonsOutput = numberButtons
    .slice(0)
    .reverse()
    .map((button) => {
      let buttonClass = classes.NumberButton;
      if (button === 0) {
        buttonClass = classes.NumberButtonZero;
      }
      return (
        <button
          className={buttonClass}
          onClick={props.onNewDigit}
          value={button.toString()}
          key={button.toString()}
        >
          {button}
        </button>
      );
    });

  return <div>{numberButtonsOutput}</div>;
};

export default Numbers;
