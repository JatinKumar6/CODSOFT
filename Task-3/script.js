let calcBtns = document.querySelectorAll(".calc-btn")
let result = document.querySelector(".result")
let clearbtn = document.querySelector(".clear-btn")
let expression = ""
let equalbtn = document.querySelector(".equal-btn")

function setoperand(event) {
    expression = expression + event.currentTarget.value
    result.textContent = ""
    result.textContent = expression
}

function clear() {
    result.textContent = ""
    expression = ""
}

function getResult(exp) {
    exp = exp.replace(/\s+/g, '')
    let tokens = []
    let numBuffer = []
    let isNegitive = false
    for (let i = 0; i < exp.length; i++) {
        let char = exp[i]
        if(char== "-" && exp[i-1] != "."){
            isNegitive = true
        }
        else if (!isNaN(char) || char == ".") {
            numBuffer.push(char)
        }
        else {
            if (numBuffer.length > 0) {
                let number = numBuffer.join("")
                tokens.push(isNegitive ? "-" + number: number)
                numBuffer = []
            }
            tokens.push(char)
        }
    }
    if (numBuffer.length > 0) {
        tokens.push(numBuffer.join(""))
    }

    function applyOperator(a, b, o) {
        a = parseFloat(a)
        b = parseFloat(b)
        switch (o) {
            case "+":
                return a + b
            case "-":
                return a - b
            case "*":
                return a * b
            case "/":
                return a / b
            default:
                throw new Error("unknown operator")
        }
    }

    let stack = []
    let currentOperator = null
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == "*" || tokens[i] == "/") {
            currentOperator = tokens[i]
        }
        else if (currentOperator) {
            let leftOperand = stack.pop()
            let rightOperand = tokens[i]
            let result = applyOperator(leftOperand, rightOperand, currentOperator)
            stack.push(result)
            currentOperator = null
        }
        else {
            stack.push(tokens[i])
        }
    }

    let result = parseFloat(stack[0])
    for (let i = 1; i < stack.length; i+=2) {
        let operator = stack[i]
        let operand = stack[i + 1]
        result = applyOperator(result, operand, operator)
    }
    return result
}

function calculate() {
    let expResult = getResult(expression)
    expression = expResult
    result.textContent = ""
    result.textContent = expResult
}

for (let i = 0; i < calcBtns.length; i++) {
    calcBtns[i].addEventListener("click", setoperand)
}

clearbtn.addEventListener("click", clear)
equalbtn.addEventListener("click", calculate)


