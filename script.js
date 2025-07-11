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

function clear() {
    calcHistory = [];
    operatorHistory = [];
    num1 = "";
    num2 = "";
    num = "";
    result = "";
    operator = "";
    display.textContent = "";
}

function updateDisplayText(e) {
    if (result) {
        display.textContent = "";
        result = "";
        calcHistory = [];
        operatorHistory = [];
    }
    if (intermediateResult) {
        display.textContent = "";
        intermediateResult = "";
    }
    let digit = e.target.textContent;
    display.textContent += digit;
    num += digit;
}

function equal(e) {
    if (calcHistory.length >= 1){
        calcHistory.push(+num);
        num1 = calcHistory.at(-2);
        num2 = calcHistory.at(-1);
        operator = operatorHistory.at(-1);
        result = operate(num1, num2, operator);
        display.textContent = result;
        calcHistory = [];
        calcHistory.push(result);
        num = "";}
    else {
        return
    }
}

function operationSelection(e) {
    if (result) {
        result = "";
    } else {
        calcHistory.push(+num);
    }
    operatorHistory.push(e.target.textContent);
    num = "";
    display.textContent = "";
    if (calcHistory.length > 1){
        num1 = calcHistory.at(-2);
        num2 = calcHistory.at(-1);
        operator = operatorHistory.at(-2);
        intermediateResult = operate(num1, num2, operator);
        calcHistory.push(intermediateResult);
        display.textContent = intermediateResult;
    }
}

let calcHistory = [];
let operatorHistory = [];
let num = "";
let result;
let intermediateResult;
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
