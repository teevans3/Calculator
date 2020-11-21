import React from "react";
import classes from "./Others.module.css";

const Others = (props) => {
  return (
    <div>
      <button
        className={classes.ClearBtn}
        onClick={props.onClearCalc}
        value="clearLast"
      >
        C
      </button>
      <button
        className={classes.ClearAllBtn}
        onClick={props.onClearCalc}
        value="clearAll"
      >
        AC
      </button>
    </div>
  );
};

export default Others;
