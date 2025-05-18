const display = document.getElementById("display");
let expression = "";

function updateDisplay() {
    display.textContent = expression || "0";
}

function append(value) {
    expression += value;
    updateDisplay();
}

function applyFunction(func) {
    switch (func) {
        case "clear":
            expression = "";
            break;
        case "delete":
            expression = expression.slice(0, -1);
            break;
        case "calculate":
            try {
                expression = math.evaluate(expression).toString();
            } catch {
                expression = "Error";
                setTimeout(() => {
                    expression = "";
                    updateDisplay();
                }, 1000);
            }
            break;
        case "sqrt":
            expression += "sqrt(";
            break;
        case "pow":
            expression += "^";
            break;
        case "pi":
            expression += "pi";
            break;
        case "e":
            expression += "e";
            break;
        case "sin":
        case "cos":
        case "tan":
        case "log":
            expression += func + "(";
            break;
    }
    updateDisplay();
}

// Button Clicks
document.querySelectorAll("button").forEach(btn => {
    const val = btn.dataset.value;
    const func = btn.dataset.func;
    if (val) btn.addEventListener("click", () => append(val));
    if (func) btn.addEventListener("click", () => applyFunction(func));
});

// Keyboard Support
document.addEventListener("keydown", e => {
    const key = e.key;
    if ("0123456789.+-*/()^".includes(key)) append(key);
    else if (key === "Enter") applyFunction("calculate");
    else if (key === "Backspace") applyFunction("delete");
    else if (key === "Escape") applyFunction("clear");
});
