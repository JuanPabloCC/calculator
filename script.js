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
    return Math.round((num1 / num2) * 100)/100
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
    userInput = false;
    result = "";
    operator = "";
    display.textContent = "";
}

function divisionByZero() {
    display.textContent = "No division by zero!";
    calcHistory = [];
    operatorHistory = [];
    num1 = "";
    num2 = "";
    num = "";
    userInput = false;
    operator = "";
}

function updateDisplayText(digit) {
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
    display.textContent += digit;
    num += digit;
    userInput = true;
}

function keyPressed(key) {
    if (numbers.includes(+key)) {
        updateDisplayText(key);
    } else if (operators.includes(key)) {
        operationSelection(key);
    } else if (key === "="){
        equal();
    } else if (key === "Delete"){
        clear();
    } else {
        return
    }
}

function equal() {
    if (calcHistory.length >= 1){
        calcHistory.push(+num);
        num1 = calcHistory.at(-2);
        num2 = calcHistory.at(-1);
        operator = operatorHistory.at(-1);
        result = operate(num1, num2, operator);
        if (result === Infinity) {
            divisionByZero();
        } else {
            display.textContent = result;
            calcHistory = [];
            calcHistory.push(result);
            num = "";
            userInput = false;
        }
    }
    else {
        return
    }
}

function operationSelection(operator) {
    if (result) {
        result = "";
    } else {
        if (userInput){
            calcHistory.push(+num);
        }
    }
    operatorHistory.push(operator);
    num = "";
    userInput = false;
    display.textContent = "";
    if (calcHistory.length > 1){
        num1 = calcHistory.at(-2);
        num2 = calcHistory.at(-1);
        operator = operatorHistory.at(-2);
        intermediateResult = operate(num1, num2, operator);
        if (intermediateResult === Infinity) {
            divisionByZero();
        } else {
            calcHistory.push(intermediateResult);
            display.textContent = intermediateResult;
        }
    }
}



let calcHistory = [];
let operatorHistory = [];
let userInput = false;
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let operators = ["+", "-", "*", "/"];
let num = "";
let result;
let intermediateResult;
let num1;
let num2;
let operator;
let buttons = document.querySelectorAll("button");
let display = document.querySelector("#calc-display-text");
let digitButtons = document.querySelectorAll(".digit");
let operatorButtons = document.querySelectorAll(".operator");
let equalButton = document.querySelector("#btn-equal");
let clearButton = document.querySelector("#btn-clear");

document.addEventListener("keydown", function(e) {keyPressed(e.key)});
digitButtons.forEach(item => item.addEventListener("click", function(e) {updateDisplayText(e.target.textContent)}));
operatorButtons.forEach(item => item.addEventListener("click", function(e) {operationSelection(e.target.textContent)}));
equalButton.addEventListener("click", equal);
clearButton.addEventListener("click", clear);
