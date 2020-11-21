import React, { Component } from "react";
import classes from "./Calculator.module.css";
import Numbers from "../../components/Buttons/Numbers/Numbers";
import Operators from "../../components/Buttons/Operators/Operators";
import Others from "../../components/Buttons/Others/Others";
import Output from "../../components/Output/Output";
class Calculator extends Component {
  state = {
    output: "",
    digitsList: [],
    operationsList: [],
    equation: "",
    operatorLast: true,
    digitError: false,
    operationError: false,
    digitSolutionError: false,
    divisionError: false,
    calculationError: false
  };

  newDigit = (event) => {
    // check if digits list is greater than 8
    if (this.state.digitsList.length > 7) {
      console.log(
        "Calculator will not accept numbers, nor provide answers, with more than 8 digits."
      );
      this.setState({
        digitError: true,
        operationError: false,
        digitSolutionError: false,
        divisionError: false,
        calculationError: false
      });
      return this.state;
    }
    //
    // add new digit to digit list, update output, add to equation, set operatorLast = false
    const newDigit = event.target.value;
    const newDigitsList = this.state.digitsList.concat(newDigit);
    let equationString =
      this.state.equation + newDigitsList.join("").toString();
    // If user is adding new digit to number (thus operatorLast = false), just add the single digit
    if (!this.state.operatorLast) {
      equationString = this.state.equation + newDigit.toString();
    }

    this.setState({
      output: this.state.digitsList.join("") + newDigit,
      digitsList: newDigitsList,
      operatorLast: false,
      equation: equationString,
      digitError: false,
      operationError: false,
      digitSolutionError: false,
      divisionError: false,
      calculationError: false
    });
  };

  newOperator = (event) => {
    // if operatorLast = true, return state.. nothing happens
    if (this.state.operatorLast) {
      console.log("You cannot operate on an operator. Nothing will happen.");
      this.setState({
        digitError: false,
        operationError: true,
        digitSolutionError: false,
        divisionError: false,
        calculationError: false
      });
      return this.state;
    }
    // add digits list (as one number) to operations list, followed by operator clicked
    // update equation, update output, empty digits list, set operatorLast = true
    const newOperator = event.target.value;
    this.setState({
      output: newOperator,
      digitsList: [],
      operationsList: this.state.operationsList.concat(
        this.state.output,
        newOperator
      ),
      equation: this.state.equation + " " + newOperator + " ",
      operatorLast: true,
      digitError: false,
      operationError: false,
      digitSolutionError: false,
      divisionError: false,
      calculationError: false
    });
  };

  calcSolution = () => {
    // don't let user do something like "5 + 5 + =", if so, show error
    if (this.state.operatorLast) {
      this.setState({
        output: "",
        digitsList: [],
        operationsList: [],
        equation: "",
        operatorLast: true,
        digitError: false,
        digitSolutionError: false,
        operationError: false,
        divisionError: false,
        calculationError: true
      });
      return this.state;
    }
    this.setState(
      {
        operationsList: this.state.operationsList.concat(this.state.output),
        equation: this.state.equation + " " + this.state.output
      },
      () => {
        // solve equation based on operationsList (for loop)
        let solution = parseInt(this.state.operationsList[0]);
        const operationsList = this.state.operationsList;
        for (var i = 1; i < operationsList.length; i += 2) {
          if (operationsList[i + 1] === "0") {
            console.log("You cannot divide by 0.");
            this.setState({
              output: "",
              digitsList: [],
              operationsList: [],
              equation: "",
              operatorLast: true,
              digitError: false,
              digitSolutionError: false,
              operationError: false,
              divisionError: true,
              calculationError: false
            });
            return this.state;
          }
          switch (operationsList[i]) {
            case "+":
              solution = solution + parseInt(operationsList[i + 1]);
              break;
            case "-":
              solution = solution - this.state.operationsList[i + 1];
              break;
            case "×":
              solution = solution * this.state.operationsList[i + 1];
              break;
            case "÷":
              solution = solution / this.state.operationsList[i + 1];
              break;
            default:
              solution = solution;
              break;
          }
        }
        // Round to two integers if not an integer
        if (!Number.isInteger(solution)) {
          solution = solution.toFixed(2);
        }
        // Make sure solution is not more than 8 digits:
        if (solution.toString().length > 8) {
          this.setState({
            output: "",
            digitsList: [],
            operationsList: [],
            equation: "",
            operatorLast: true,
            digitSolutionError: true
          });
          return this.state;
        } else {
          // update ouptut to be solution, digits list to be of new solution,
          // restart operation list with new solution at start
          // update equation to just have solution now
          // set operator last = false
          this.setState({
            output: solution,
            digitsList: solution.toString().split(""),
            operationsList: [],
            equation: solution,
            operatorLast: false
          });
        }
      }
    );
  };

  clearCalc = (event) => {
    if (event.target.value === "clearLast") {
      if (this.state.operatorLast) {
        // remove last operator from operations list and equation,
        // update digits list to include last number and update output to that number
        const newOperationsList = this.state.operationsList;
        newOperationsList.pop();
        let lastNumber = newOperationsList[newOperationsList.length - 1];
        if (lastNumber === undefined) {
          lastNumber = "";
        }
        this.setState({
          output: lastNumber,
          digitsList: lastNumber.split(""),
          operationsList: newOperationsList,
          equation: newOperationsList.join(" "),
          operatorLast: false
        });
      } else {
        // first update the state operationsList to include the new number (that is going to be cleared)
        this.setState(
          {
            operationsList: this.state.operationsList.concat(this.state.output)
          },
          () => {
            // remove last number from operations list and equation,
            // empty digits list and change output to last operator
            const newOperationsList = this.state.operationsList;
            newOperationsList.pop();
            const lastOperator =
              newOperationsList[newOperationsList.length - 1];
            this.setState({
              output: lastOperator,
              digitsList: [],
              operationsList: newOperationsList,
              equation: newOperationsList.join(" "),
              operatorLast: true
            });
          }
        );
      }
    }

    if (event.target.value === "clearAll") {
      // reset state completely
      this.setState({
        output: "",
        digitsList: [],
        operationsList: [],
        equation: "",
        operatorLast: true,
        digitError: false,
        digitSolutionError: false,
        operationError: false,
        divisionError: false,
        calculationError: false
      });
    }
  };

  render() {
    // let digitErrorDisplay = this.state.digitError ? (
    //   <span>
    //     [Digit Error] Calculator will not accept numbers, nor provide answers,
    //     with more than 8 digits.
    //   </span>
    // ) : null;

    // let operationErrorDisplay = this.state.operationError ? (
    //   <span>
    //     [Operation Error] You cannot operate on an operator. Nothing will
    //     happen.
    //   </span>
    // ) : null;

    // let divisionErrorDisplay = this.state.divisionError ? (
    //   <span>[Division Error] You cannot divide by zero.</span>
    // ) : null;

    // let calculationDisplay = this.state.digitSolutionError ? (
    //   <span>
    //     [Digit Solution Error] This calculation's provides an answer with more
    //     than 8 digits, which we cannot do.
    //   </span>
    // ) : (
    //   <span>{this.state.equation}</span>
    // );

    // let calculationError = this.state.calculationError ? (
    //   <span>
    //     {" "}
    //     [Calculation Error] You cannot operate on an operator. Nothing will
    //     happen.{" "}
    //   </span>
    // ) : null;

    let outputDisplay = <Output output={this.state.output} />;
    if (this.state.digitError) {
      outputDisplay = (
        <div className={classes.ErrorDisplay}>
          <span>
            [Digit Error] Calculator will not accept numbers, nor provide
            answers, with more than 8 digits.
          </span>
        </div>
      );
    }
    if (this.state.operationError) {
      outputDisplay = (
        <div className={classes.ErrorDisplay}>
          <span>
            [Operation Error] You cannot operate on an operator. Nothing will
            happen.
          </span>
        </div>
      );
    }
    if (this.state.divisionError) {
      outputDisplay = (
        <div className={classes.ErrorDisplay}>
          <span>[Division Error] You cannot divide by zero.</span>
        </div>
      );
    }
    if (this.state.calculationError) {
      outputDisplay = (
        <div className={classes.ErrorDisplay}>
          <span>
            {" "}
            [Calculation Error] You cannot operate on an operator. Nothing will
            happen.{" "}
          </span>
        </div>
      );
    }
    if (this.state.digitSolutionError) {
      outputDisplay = (
        <div className={classes.ErrorDisplay}>
          <span>
            [Digit Solution Error] This calculation's provides an answer with
            more than 8 digits, which we cannot do.
          </span>
        </div>
      );
    }

    return (
      <div className={classes.Calculator}>
        <div className={classes.CalcDisplay}>{this.state.equation}</div>
        {/* <div>{digitErrorDisplay}</div>
        <div>{operationErrorDisplay}</div>
        <div>{divisionErrorDisplay}</div>
        <div>{calculationError}</div> */}
        {/* <Output output={this.state.output} /> */}
        {outputDisplay}
        <div className={classes.ButtonsDiv}>
          <div className={classes.OthersDiv}>
            <Others onClearCalc={this.clearCalc} />
          </div>
          <div className={classes.NumbersDiv}>
            <Numbers onNewDigit={this.newDigit} />
          </div>
          <div className={classes.OperatorsDiv}>
            <Operators
              onNewOperator={this.newOperator}
              onCalcSolution={this.calcSolution}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
