let expression = ''; // Хранит текущее выражение
const history = []; // Хранит историю вычислений

// Добавление числа
function appendNumber(number) {
    if (number === '.' && expression.includes('.')) return; // Запрет на несколько точек
    expression += number;
    updateDisplay();
}

// Добавление оператора
function appendOperator(operator) {
    if (expression === '') return;
    const lastChar = expression[expression.length - 1];
    if (['+', '-', '*', '/'].includes(lastChar)) {
        expression = expression.slice(0, -1) + operator;
    } else {
        expression += operator;
    }
    updateDisplay();
}

// Вычисление результата
function calculateResult() {
    try {
        const result = eval(expression);
        history.push(`${expression} = ${result}`);
        expression = result.toString();
        updateDisplay();
        updateHistory();
    } catch (error) {
        expression = '';
        updateDisplay('Ошибка');
        setTimeout(() => updateDisplay('0'), 1000);
    }
}

// Очистка дисплея
function clearDisplay() {
    expression = '';
    updateDisplay();
}

// Обновление дисплея
function updateDisplay(value = null) {
    const display = document.getElementById('display');
    display.textContent = value || expression || '0';
    if (value === 'Ошибка') {
        display.classList.add('error');
    } else {
        display.classList.remove('error');
    }
}

// Обновление истории
function updateHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = history.join('<br>');
}

// Обработка ввода с клавиатуры
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9.]/.test(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        expression = expression.slice(0, -1);
        updateDisplay();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
