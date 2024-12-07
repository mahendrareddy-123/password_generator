// Select elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('number');
const symbolsEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Random functions for generating characters
const randomFunc = {
    lower: getRandomLowercase,
    upper: getRandomUppercase,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

// Event listener for generating password
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.textContent = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;

    // Check if no option is selected
    if (typesCount === 0) {
        return 'Please select at least one option!';
    }

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    return generatedPassword.slice(0, length);
}

// Copy to clipboard functionality
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.textContent;

    if (!password || password === 'Please select at least one option!') {
        alert('Nothing to copy!');
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});

// Random generators
function getRandomLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*()_+[]{}<>?,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
