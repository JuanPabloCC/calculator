function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return Math.round((num1 / num2) * 10)/10
}

/**
 * Returns an arimethic operation on num1 and num2 based on given operator
 * @param {*} num1 - first argument.
 * @param {*} num2 - second argument.
 * @param {*} operator - operator.
 * @returns 
 */
function operate(num1, num2, operator) {

    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return undefined
    }
}

/**
 * Updates calculator display.
 * @param {*} e - event information.
 */
function updateDisplayText(e) {
    let digitButtonText = e.target.textContent;
    displayText += digitButtonText;
    num += digitButtonText;
    display.textContent = displayText;
}

/**
 * When the clear button is pressed, clears calculator's display and all variables.
 */
function clear() {
    display.textContent = "";
    displayText = "";
    num = "";
    calcHistory = [];
}

/**
 * When the equal button is pressed, calculates the result of the operation given to the calculator
 */
function equal(e) {
    calcHistory.push(+display.textContent);
    calcHistory.push(e.target.textContent);
    if (calcHistory.length === 1) {

    }
    num1 = calcHistory[0];
    num2 = calcHistory[2];
    operator = calcHistory[1];
    result = operate(num1, num2, operator);
    // We need to set num as the result in case the user wants to continue with further calculations
    // In case that result is equal to Infinity E.g. division by zero, num will be equal to zero
    if (result === Infinity) {
        num = 0;
        display.textContent = "Can't divide by zero :(";
    } else if (result === undefined) {
        num = 0;
        display.textContent = "Non valid operation :(";
    }
    else {
        num = result;
        display.textContent = result;
    }
    calcHistory = [];
    displayText= "";
}

function operationSelection(e) {
    calcHistory.push(+num);
    num = "";
    displayText = "";
    display.textContent = displayText;
    // If there's 3 elements in calcHistory, it means that the user
    // has input two numbers and one operator in this case the calculator
    // will make an operation since it is the way it's needed
    if (calcHistory.length === 3) {
        num1 = calcHistory[0];
        num2 = calcHistory[2];
        operator = calcHistory[1];
        result = operate(num1, num2, operator);
        // We need to reset the calcHistory since it is designed to do only two-operands operations
        // We also need to push the current result to calcHistory in case the user wants to continue operations
        calcHistory = [];
        // if the result is Infinity E.g. division by zero, we will push zero
        // otherwise we will push the actual result to calcHistory
        if (result === Infinity) {
            calcHistory.push(0);
            display.textContent = "Can't divide by zero :(";
        } else {
            calcHistory.push(result);
            display.textContent = calcHistory[0];
        }
    }
    // Appends the operator to calcHistory
    calcHistory.push(e.target.textContent);
    
}

let calcHistory = [];
let num = "";
let result;
let num1;
let num2;
let operator;
let display = document.querySelector("#calc-display-text");
let displayText = display.textContent;
let digitButtons = document.querySelectorAll(".digit");
let operatorButtons = document.querySelectorAll(".operator");
let equalButton = document.querySelector("#btn-equal");
let clearButton = document.querySelector("#btn-clear");


digitButtons.forEach(item => item.addEventListener("click", function(e) {updateDisplayText(e)}));
operatorButtons.forEach(item => item.addEventListener("click", function(e) {operationSelection(e)}));
equalButton.addEventListener("click", function(e) {equal(e)});
clearButton.addEventListener("click", clear);

