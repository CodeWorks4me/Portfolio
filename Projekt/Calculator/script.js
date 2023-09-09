"use strict"

//class med functioner
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    //rensa hela displayen
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    //rensa den nuvarande displayen (nedanför)
    clearEntry() {
        this.currentOperand = ''
    }

    //rensa en i taget inom nuravande displayen
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //så att du inte kan ha mer än 1 punkt ("."), annars (efter equals så blir denna "true"),
    //om den anses vara true, sätts den som false, rensar displayen så svaret inte stackar med kommande siffra,
    //men där du fortfarande kan använda svaret igen om du klickar på en "operation"
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return
        }

        if (clearOnNextNumberAfterEqual) {
            clearOnNextNumberAfterEqual = false
            this.currentOperand = ''
            this.currentOperand = this.currentOperand.toString() + number.toString()
        } 
        else {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    //här om din nuvarande displayer är tom så kommer inget att ske, men om du har valt ett nummer 
    //och sedan en operation (vid operations val så sätts dom i displayen ovan) så kommer compute functionen
    //att köras.
    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return
        }
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //här hanteras beräkningarna med först en säkring där du måste ha ett nummer inom ett utav displayerna
    //har du det så startas switch där, utifrån vald operation så startas ett case och där den sedan
    //ges till nuvarande displayen och sedan där operation och ovan display får en clear och
    //där bool variabeln anses vara true.
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) {
            return
        }
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;

            case '-':
                computation = prev - current
                break;

            case 'x':
                computation = prev * current
                break;

            case '÷':
                computation = prev / current
                break;
                
            default:
                return;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        clearOnNextNumberAfterEqual = true
    }

    //här så ser den till att förvandla nummer till sträng så den kan displayas,
    //den möjliggör situationsanvändning mellan integer och decimal så att "." kan användas i beräkningarna
    //har du ingen integer, låt displayen vara tom, har du det, möjliggör dess användande och där du
    //efter varje 3 noller (3,000 som exempel) så kan "," tilläggas
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } 
        else {
            return integerDisplay
        }
    }

    //här används det som gjordes i getdisplaynumber inom den nuvarande displayens och där,
    //om operations inte är oanvänd så ges det som gjordes i getdisplaynumber till displayen
    //ovan tillsammans med operationen (så att du kan se vad du skrivit tidigare)
    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

//pekare, använder "data" för en separation mellan css och js
//bool användning och sedan variabel som använder calculator klassen ovan
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const clearEntryButton = document.querySelector('[data-clear-entry]')
const plusMinusButton = document.querySelector('[data-plus-minus]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

let clearOnNextNumberAfterEqual = false

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//hanterar knapparna använda så det kan läggas till som sträng i displayen och sedan visa det
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//detta är samma som ovan men där den också finns för att kunna kunna användas utav compute funktionen
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

//samma som ovan men denna gång där den denna gång istället används av compute för att kunna displaya resultatet
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

//rensaren och sedan visa hanteringen
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

//rensaren av nuvarande inputten och sedan visa dess hantering
clearEntryButton.addEventListener('click', button => {
    calculator.clearEntry()
    calculator.updateDisplay()
})

//den som rensar ett alfabet i taget
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})