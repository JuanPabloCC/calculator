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

function updateDisplayText(e) {
    let digit = e.target.textContent;
    display.textContent += digit;
}

function clear() {
    calcHistory = [];
    operatorHistory = [];
    num1 = "";
    num2 = "";
    result = "";
    operator = "";
    display.textContent = "";
}

function equal(e) {
    calcHistory.push(+display.textContent);
    num1 = calcHistory[0];
    num2 = calcHistory[1];
    operator = operatorHistory[0];
    result = operate(num1, num2, operator);
    display.textContent = result;
}

function operationSelection(e) {
    calcHistory.push(+display.textContent);
    operatorHistory.push(e.target.textContent);
    display.textContent = "";
    console.log(calcHistory);
    console.log(operatorHistory);
}

let calcHistory = [];
let operatorHistory = [];
let result;
let num1;
let num2;
let operator;
let display = document.querySelector("#calc-display-text");
let digitButtons = document.querySelectorAll(".digit");
let operatorButtons = document.querySelectorAll(".operator");
let equalButton = document.querySelector("#btn-equal");
let clearButton = document.querySelector("#btn-clear");


digitButtons.forEach(item => item.addEventListener("click", function(e) {updateDisplayText(e)}));
operatorButtons.forEach(item => item.addEventListener("click", function(e) {operationSelection(e)}));
equalButton.addEventListener("click", function(e) {equal(e)});
clearButton.addEventListener("click", clear);
