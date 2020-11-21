import React, { Component } from "react";
import classes from "./Calculator.module.css";

class Calculator extends Component {
  state = {
    output: "",
    digitsList: [],
    operationsList: [],
    equation: ""
  };

  newDigit = (event) => {
    if (this.state.digitsList.length > 7) {
      console.log("You may not enter numbers with more than 8 digits.");
      return this.state;
    }
    this.setState({
      digitsList: this.state.digitsList.concat(parseInt(event.target.value)),
      output: parseInt(
        this.state.digitsList.concat(parseInt(event.target.value)).join("")
      )
    });
  };

  newOperator = (event) => {
    const newOperator = event.target.value;

    if (this.state.digitsList.length < 1) {
      console.log("Operating on no value. Nothing will happen.");
      return this.state;
    }

    let equationString = `${this.state.equation} ${this.state.output} ${event.target.value}`;
    // If user already hit '=', restart the equation
    if (this.state.equation.includes("=")) {
      equationString = this.state.output + " " + event.target.value;
    }

    // Add the new operator to the state
    this.setState({
      output: event.target.value,
      digitsList: [],
      operationsList: this.state.operationsList.concat(
        this.state.output,
        newOperator
      ),
      equation: equationString
    });
  };

  calcSolution = () => {
    const newOperationsList = this.state.operationsList.concat(
      this.state.output
    );
    this.setState(
      {
        operationsList: newOperationsList
      },
      () => {
        const equationList = this.state.operationsList;
        console.log(equationList);

        let solution = equationList[0];

        for (var i = 1; i < equationList.length; i += 2) {
          switch (equationList[i]) {
            case "+":
              solution = solution + equationList[i + 1];
              break;
            case "-":
              solution = solution - equationList[i + 1];
              break;
            case "×":
              solution = solution * equationList[i + 1];
              break;
            case "÷":
              solution = solution / equationList[i + 1];
              break;
            default:
              break;
          }
        }
        this.setState(
          {
            output: solution,
            digitsList: solution.toString().split(""),
            operationsList: [],
            equation: newOperationsList.join(" ") + " = " + solution
          },
          () => console.log(this.state)
        );
      }
    );
  };

  clearCalc = (event) => {
    // If "C" - remove last element; either number or operator
    if (event.target.value === "clearLast") {
      let newOperationsList = this.state.operationsList;
      newOperationsList.pop();
      this.setState({
        operationsList: newOperationsList,
        equation: newOperationsList.join(" ")
      });
      console.log(this.state.operationsList);
    }
    // If "AC" - remove all numbers and operators and clear output
    if (event.target.value === "clearAll") {
      this.setState({
        output: "",
        digitsList: [],
        operationsList: [],
        equation: ""
      });
    }
  };

  render() {
    return (
      <div className={classes.Calculator}>
        <textarea
          resize="none"
          value={this.state.output}
          maxlength="8"
          readOnly={true}
        >
          {this.state.output}
        </textarea>
        <div>
          <button onClick={(event) => this.newDigit(event)} value="0">
            0
          </button>
          <button onClick={(event) => this.newDigit(event)} value="1">
            1
          </button>
          <button onClick={(event) => this.newDigit(event)} value="2">
            2
          </button>
          <button onClick={(event) => this.newDigit(event)} value="3">
            3
          </button>
          <button onClick={(event) => this.newDigit(event)} value="4">
            4
          </button>
          <button onClick={(event) => this.newDigit(event)} value="5">
            5
          </button>
          <button onClick={(event) => this.newDigit(event)} value="6">
            6
          </button>
          <button onClick={(event) => this.newDigit(event)} value="7">
            7
          </button>
          <button onClick={(event) => this.newDigit(event)} value="8">
            8
          </button>
          <button onClick={(event) => this.newDigit(event)} value="9">
            9
          </button>
        </div>
        <div>
          <button onClick={this.newOperator} value="+">
            +
          </button>
          <button onClick={this.newOperator} value="-">
            -
          </button>
          <button onClick={this.newOperator} value="×">
            ×
          </button>
          <button onClick={this.newOperator} value="÷">
            ÷
          </button>
          <button onClick={this.calcSolution} value="=">
            =
          </button>
        </div>
        <div>
          <button onClick={this.clearCalc} value="clearLast">
            C
          </button>
          <button onClick={this.clearCalc} value="clearAll">
            AC
          </button>
        </div>
        <div>
          <h3>{this.state.equation}</h3>
        </div>
      </div>
    );
  }
}

export default Calculator;
