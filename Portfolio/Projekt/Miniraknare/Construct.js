"use strict";

let currentnumber = "";
let previousnumber = "";
let operator = "";
let clearOnNextNum = false;
const numberButtons = document.querySelectorAll(".num-btn")
const operatorButtons = document.querySelectorAll(".operator")
const equal = document.querySelector(".equal");
const dot = document.querySelector(".dot");
const clearBtn = document.querySelector(".clear"); //clear everything
const clearEntryBtn = document.querySelector(".clear_entry"); //clear currententry
const deleteBtn = document.querySelector(".delete"); //delete single value in currententry
const plusminusBtn = document.querySelector(".plusminus"); //turn numbervalue positive or negative
const previousDisplay = document.querySelector(".previous");
const currentDisplay = document.querySelector(".current");

//addition, subtraction, multiplication and division
function addFunction(num1, num2) {
    return num1 + num2;
}

function subFunction(num1, num2) {
    return num1 - num2;
}

function multiFunction(num1, num2) {
    return num1 * num2;
}

function divFunction(num1, num2) {
    return num1 / num2;
}

//function for the operators
function operate(value1, value2, operators) {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    let output = 0;
    
    try {

        switch (operators) {
            case '/':
                if (num2 === 0) {
                    output = "Du kan inte dividera med noll";
                }
                else {
                    output = divFunction(num1, num2);
                }
                break;

            case 'x':
                output = multiFunction(num1, num2);
                break;
            
            case '-':
                output = subFunction(num1, num2);
                break;

            case '+':
                output = addFunction(num1, num2);
                break;
        
        }

    } catch (e) {
        currentDisplay.textContent = ("There's an error: ", e)
    };

    currentDisplay.textContent = Math.round(output * 100000) / 100000;
    currentnumber = output;
    clearOnNextNum = true;
}

//equal button for the resulted number
equal.addEventListener("click", (e) => {
    if (currentnumber != "" && previousnumber != "") {
        operate(previousnumber, currentnumber, operator);
    }

    previousnumber = "";
});

//button inputs of numbers
numberButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if (clearOnNextNum) {
        clearOnNextNum = false;
        currentnumber = "";
    }

    currentnumber += number;
    currentDisplay.textContent = currentnumber;
}

//button inputs of operators
operatorButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    clearOnNextNum = false;

    if (currentnumber != "") {
        operator = op;
        previousnumber = currentnumber;
        //to make it look like an actual calc, add on + currentnumber + " " + equal
        previousDisplay.textContent = previousnumber + " " + operator;
        currentnumber = "";
        currentDisplay.textContent = "";
    }
}

//dot adder
function addDot() {
    clearOnNextNum = false;

    if (!currentnumber.includes(".")) {
        currentnumber += ".";
        currentDisplay.textContent = currentnumber;
    }
}

dot.addEventListener("click", () => {
    addDot();
});

//clear everything button
function allClear() {
    currentDisplay.textContent = "";
    previousDisplay.textContent = "";
    currentnumber = "";
    previousnumber = "";
}

clearBtn.addEventListener("click", allClear);

function delNumber() {
    currentDisplay.textContent = currentDisplay.textContent.toString().slice(0, -1);
    currentnumber = currentDisplay.textContent;
}

deleteBtn.addEventListener("click", delNumber);