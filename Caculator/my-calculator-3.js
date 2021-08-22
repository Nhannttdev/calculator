class Calculator {
    constructor(operandTextElement, resultOperandTextElement) {
        this.operandTextElement = operandTextElement;
        this.resultOperandTextElement = resultOperandTextElement;
        this.clear();
    }

    clear() {
        this.number1 = "";
        this.number2 = "";
        this.result = "";
        this.operation = undefined;
    }
    appendNumber(number) {
        if (this.operation != undefined) {
            if (number === '.' && this.number2.includes('.')) return;
            this.number2 = this.number2.toString() + number.toString();
        } else {
            if (number === '.' && this.number1.includes('.')) return;
            this.number1 = this.number1.toString() + number.toString();
        }
    }
    chooseOperation(operation) {
        if (!this.operation) {
            this.operation = operation;
        }
    }
    compute() {
        let computation
        const number1 = parseFloat(this.number1);
        const number2 = parseFloat(this.number2);
        if (isNaN(number1) || isNaN(number2)) return; {
            switch (this.operation) {
                case "+":
                    computation = number1 + number2;
                    break;
                case "-":
                    computation = number1 - number2;
                    break;
                case "*":
                    computation = number1 * number2;
                    break;
                case "/":
                    computation = number1 / number2;
                    break;
                default:
                    return;
            }
            this.result = computation;
        }
    }
    updateDisplay() {
        this.operandTextElement.innerText =
            this.number1.toString() +
            " " +
            (this.operation || " ") +
            " " +
            this.number2.toString();
    }
    updateDisplayResult() {
        if (this.number1 && !this.number2 && !this.operation) {
            this.resultOperandTextElement.innerText = this.result;
        } else {
            const a = parseFloat(this.number2);
            if (a == 0 && this.operation == "/") {
                this.resultOperandTextElement.innerText = "Không xác định";
            } else {
                this.resultOperandTextElement.innerText = this.result;
            }
        }
    }
}
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const operandTextElement = document.querySelector("[data-previous-operand]");
const resultOperandTextElement = document.querySelector(
    "[data-current-operand]"
);
const calculator = new Calculator(operandTextElement, resultOperandTextElement);
console.log("333333333", calculator);
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
    calculator.updateDisplayResult();
});

allClearButton.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updateDisplay();
    calculator.updateDisplayResult();
});