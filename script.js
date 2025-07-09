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
    return num1 / num2
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
            return "Not a valid operator!"
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

function clear () {
    display.textContent = "";
    displayText = "";
    num = "";
    numHistory = [];
}

/**
 * When the equal button is pressed, calculates the result of the operation given to the calculator
 */
function equal () {
    numHistory.push(+display.textContent);
    num1 = numHistory[0];
    num2 = numHistory[2];
    operator = numHistory[1];
    result = operate(num1, num2, operator);
    num = result;
    numHistory = [];
    display.textContent = result;
    displayText= "";
    console.log(numHistory);
}

function operationSelection(e) {
    numHistory.push(+num);
    num = "";
    if (numHistory.length === 3) {
        num1 = numHistory[0];
        num2 = numHistory[2];
        operator = numHistory[1];
        result = operate(num1, num2, operator);
        numHistory = [];
        numHistory.push(result);
    }
    numHistory.push(e.target.textContent);
    display.textContent = numHistory[0];
    displayText= "";
    console.log(numHistory);
}

let numHistory = [];
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


digitButtons.forEach(item => item.addEventListener("click", function (e) {updateDisplayText(e)}));
operatorButtons.forEach(item => item.addEventListener("click", function (e){operationSelection(e)}));
equalButton.addEventListener("click", equal);
clearButton.addEventListener("click", clear);

