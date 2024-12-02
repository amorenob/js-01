

const displayEl = document.querySelector('#display');
const numbersEls = document.querySelectorAll('.key.number');
const OperatorEls = document.querySelectorAll('.key.oper');
const clearBtn = document.querySelector('#clearBtn');
const resultBtn = document.querySelector('#resultBtn');

console.log(numbersEls);

numbersEls.forEach(element => {
    element.addEventListener('click', () => {
        displayEl.value += element.textContent;
    });
});

OperatorEls.forEach(element => {
    element.addEventListener('click', () => {
        displayEl.value += element.textContent;
    });
});

clearBtn.addEventListener('click', () => {
    displayEl.value = '';
});

resultBtn.addEventListener('click', () => {
    const expr = displayEl.value.split(/([+\-*/])/);
    const result = calculate(expr);
    console.log(result);
    if (result) displayEl.value = result;
});

function calculate(expression){
    // handle * and /
    for (let i = 1; i < expression.length - 1; i += 2) {
        if(expression[i] === '*' || expression[i] === '/') {
            const num1 = parseFloat(expression[i - 1]);
            const num2 = parseFloat(expression[i + 1]);
            let result;
            switch (expression[i]){
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
            }
            // replace exp with result
            expression.splice(i - 1, 3, result.toString());
        };
    };
    // handle + and -
    let result = parseFloat(expression[0]);
    for (let i = 1; i < expression.length - 1; i += 2) {
        if(expression[i] === '+' || expression[i] === '-') {
            const num2 = parseFloat(expression[i + 1]);
            switch (expression[i]){
                case '+':
                    result += num2;
                    break;
                case '-':
                    result -= num2;
                    break;
            }
        };
    };
    return result
}