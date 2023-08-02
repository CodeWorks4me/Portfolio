"use strict";

let currentnumber = "";
let previousnumber = "";
let operator = "";
let clearOnNextNum = false;
const numberButtons = document.querySelectorAll(".num-btn");
const operatorButtons = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const dot = document.querySelector(".dot");
const clearBtn = document.querySelector(".clear"); //clear everything
const clearEntryBtn = document.querySelector(".clear_entry"); //clear currententry
const deleteBtn = document.querySelector(".delete"); //delete single value in currententry
const plusminusBtn = document.querySelector(".plusminus"); //turn numbervalue positive or negative
const previousDisplay = document.querySelector("display_previousentry");
const currentDisplay = document.querySelector(".display_currententry");

