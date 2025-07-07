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

function updateDisplayText(e) {
    let digitButtonText = e.target.textContent;
    if (displayText === "0"){
        displayText = "";
    }
    displayText += digitButtonText;
    display.textContent = displayText;
    console.log(displayText);
}

function operationSelection(e) {
    num1 = +display.textContent;
    operator = e.target.textContent;
    displayText += operator;
    display.textContent = displayText;
    num1Selected = true;
    operatorSelected = true;
}

let num1;
let num2;
let operator;
let num1Selected = false;
let operatorSelected = false;
let display = document.querySelector("#calc-display-text");
let displayText = display.textContent;
let digitButtons = document.querySelectorAll(".digit");
let operatorButtons = document.querySelectorAll(".operator");

digitButtons.forEach(item => item.addEventListener("click", function (e) {updateDisplayText(e)}));
operatorButtons.forEach(item => item.addEventListener("click", function (e){operationSelection(e)}));

