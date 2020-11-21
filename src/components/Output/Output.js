import React from "react";
import classes from "./Output.module.css";

const Output = (props) => {
  return (
    <textarea
      resize="none"
      value={props.output}
      readOnly={true}
      className={classes.Output}
    >
      {props.output}
    </textarea>
  );
};

export default Output;
